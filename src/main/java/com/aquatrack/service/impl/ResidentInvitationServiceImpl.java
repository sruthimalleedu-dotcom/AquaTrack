package com.aquatrack.service.impl;

import com.aquatrack.dto.resident.CreateResidentInvitationRequestDto;
import com.aquatrack.dto.resident.ResidentActivationDetailsResponseDto;
import com.aquatrack.dto.resident.ResidentActivationRequestDto;
import com.aquatrack.dto.resident.ResidentInvitationResponseDto;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.ResidentInvitation;
import com.aquatrack.entity.User;
import com.aquatrack.enums.ManagerInvitationStatus;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.BadRequestException;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.ResidentInvitationMapper;
import com.aquatrack.notification.model.ResidentInvitationEmailModel;
import com.aquatrack.notification.service.NotificationService;
import com.aquatrack.repository.HouseholdRepository;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.ResidentInvitationRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.ResidentInvitationService;
import com.aquatrack.util.SecurityUtil;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ResidentInvitationServiceImpl
        implements ResidentInvitationService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final ResidentInvitationRepository residentInvitationRepository;

    private final UserRepository userRepository;

    private final HouseholdRepository householdRepository;

    private final ResidentInvitationMapper residentInvitationMapper;

    private final PasswordEncoder passwordEncoder;

    private final NotificationService notificationService;

    private final ManagerBuildingRepository managerBuildingRepository;

    // ==========================================
// Create Resident Invitation
// ==========================================

    @Override
    public ResidentInvitationResponseDto createResidentInvitation(
            CreateResidentInvitationRequestDto requestDto) {

        // ==========================================
        // Get Logged-in Manager
        // ==========================================

        User manager = getCurrentManager();

        // ==========================================
        // Get Resident
        // ==========================================

        User resident = getResident(requestDto.getResidentId());

        // ==========================================
        // Validate Resident Status
        // ==========================================

        if (Boolean.TRUE.equals(resident.getIsActive())) {

            throw new BadRequestException(
                    "Resident account is already active."
            );

        }

        // ==========================================
        // Validate Household
        // ==========================================

        Household household = resident.getHousehold();

        if (household == null) {

            throw new BadRequestException(
                    "Resident is not assigned to any household."
            );

        }

        // ==========================================
        // Validate Manager Assignment
        // ==========================================

        validateManagerAccess(manager, household);

        // ==========================================
        // Check Pending Invitation
        // ==========================================

        if (residentInvitationRepository.existsByResidentAndStatus(
                resident,
                ManagerInvitationStatus.PENDING)) {

            throw new DuplicateResourceException(
                    "A pending invitation already exists for this resident."
            );

        }

        // ==========================================
        // Generate Invitation Token
        // ==========================================

        String token = UUID.randomUUID().toString();

        // ==========================================
        // Build Invitation
        // ==========================================

        ResidentInvitation invitation =
                residentInvitationMapper.toEntity(
                        resident,
                        household,
                        manager
                );

        invitation.setInvitationToken(token);
        invitation.setStatus(ManagerInvitationStatus.PENDING);
        invitation.setExpiresAt(LocalDateTime.now().plusHours(24));

        // ==========================================
        // Save Invitation
        // ==========================================

        ResidentInvitation savedInvitation =
                residentInvitationRepository.save(invitation);

        // ==========================================
        // Build Activation URL
        // ==========================================

        String activationUrl =
                "http://localhost:5173/resident/activate?token="
                        + token;

        // ==========================================
        // Send Invitation Email
        // ==========================================

        ResidentInvitationEmailModel emailModel =
                ResidentInvitationEmailModel.builder()
                        .residentName(
                                resident.getFirstName() + " "
                                        + (resident.getLastName() == null
                                        ? ""
                                        : resident.getLastName())
                        )
                        .email(resident.getEmail())
                        .apartmentName(
                                household.getApartment()
                                        .getApartmentName()
                        )
                        .buildingName(
                                household.getFloor()
                                        .getBuilding()
                                        .getBuildingName()
                        )
                        .householdNumber(
                                household.getHouseNumber()
                        )
                        .activationUrl(activationUrl)
                        .build();

        notificationService.sendResidentInvitationEmail(emailModel);

        // ==========================================
        // Return Response
        // ==========================================

        return residentInvitationMapper.toResponseDto(savedInvitation);

    }
    // ==========================================
// Get All Resident Invitations
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<ResidentInvitationResponseDto>
    getAllResidentInvitations() {

        User manager = getCurrentManager();

        return residentInvitationRepository
                .findAllByInvitedByOrderByCreatedAtDesc(manager)
                .stream()
                .map(residentInvitationMapper::toResponseDto)
                .toList();

    }

    // ==========================================
// Get Resident Invitation By ID
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public ResidentInvitationResponseDto
    getResidentInvitationById(Long invitationId) {

        User manager = getCurrentManager();

        ResidentInvitation invitation =
                getResidentInvitation(invitationId);

        if (!invitation.getInvitedBy()
                .getId()
                .equals(manager.getId())) {

            throw new ResourceNotFoundException(
                    "Resident invitation not found with ID: "
                            + invitationId
            );

        }

        return residentInvitationMapper
                .toResponseDto(invitation);

    }

// ==========================================
// Get Activation Details
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public ResidentActivationDetailsResponseDto getActivationDetails(
            String token) {

        // ==========================================
        // Validate Invitation
        // ==========================================

        ResidentInvitation invitation = validateInvitation(token);

        // ==========================================
        // Build Response
        // ==========================================

        return residentInvitationMapper.toActivationDetailsDto(invitation);

    }

// ==========================================
// Activate Resident
// ==========================================

    @Override
    public void activateResident(
            ResidentActivationRequestDto requestDto) {

        // ==========================================
        // Validate Invitation
        // ==========================================

        ResidentInvitation invitation = validateInvitation(
                requestDto.getInvitationToken()
        );

        // ==========================================
        // Validate Password
        // ==========================================

        if (!requestDto.getPassword().equals(
                requestDto.getConfirmPassword())) {

            throw new BadRequestException(
                    "Password and Confirm Password do not match."
            );

        }

        // ==========================================
        // Get Resident
        // ==========================================

        User resident = invitation.getResident();

        // ==========================================
        // Validate Resident Status
        // ==========================================

        if (Boolean.TRUE.equals(resident.getIsActive())) {

            throw new BadRequestException(
                    "Resident account is already active."
            );

        }

        // ==========================================
        // Activate Resident Account
        // ==========================================

        resident.setPassword(
                passwordEncoder.encode(
                        requestDto.getPassword()
                )
        );

        resident.setIsActive(true);

        userRepository.save(resident);

        // ==========================================
        // Update Invitation Status
        // ==========================================

        invitation.setStatus(
                ManagerInvitationStatus.ACTIVATED
        );

        invitation.setActivatedAt(
                LocalDateTime.now()
        );

        residentInvitationRepository.save(invitation);

    }

    // ==========================================
// Helper Methods
// ==========================================

    /**
     * Returns the currently logged-in Manager.
     *
     * @return Manager user
     */
    private User getCurrentManager() {

        String email = SecurityUtil.getCurrentUserEmail();

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Logged-in manager not found."
                        )
                );

        if (manager.getRole() != UserRole.MANAGER) {

            throw new AccessDeniedException(
                    "Only managers can perform this action."
            );

        }

        return manager;

    }

    /**
     * Returns the resident by ID.
     *
     * @param residentId Resident ID
     * @return Resident user
     */
    private User getResident(Long residentId) {

        return userRepository
                .findByIdAndRole(
                        residentId,
                        UserRole.RESIDENT
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resident not found with ID: "
                                        + residentId
                        )
                );

    }

    /**
     * Returns the resident invitation by ID.
     *
     * @param invitationId Invitation ID
     * @return Resident invitation
     */
    private ResidentInvitation getResidentInvitation(
            Long invitationId) {

        return residentInvitationRepository
                .findById(invitationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resident invitation not found with ID: "
                                        + invitationId
                        )
                );

    }

    /**
     * Validates whether the manager is assigned to
     * the building of the given household.
     *
     * @param manager Logged-in manager
     * @param household Household
     */
    private void validateManagerAccess(
            User manager,
            Household household) {

        if (!managerBuildingRepository.existsByManagerAndBuilding(
                manager,
                household.getFloor()
                        .getBuilding())) {

            throw new AccessDeniedException(
                    "You are not authorized to manage this household."
            );

        }

    }

    /**
     * Validates the invitation token and returns
     * the corresponding invitation.
     *
     * Validation includes:
     * - Token exists
     * - Invitation is still pending
     * - Invitation has not expired
     *
     * @param token Invitation token
     * @return Resident invitation
     */
    private ResidentInvitation validateInvitation(
            String token) {

        ResidentInvitation invitation =
                residentInvitationRepository
                        .findByInvitationToken(token)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid invitation token."
                                )
                        );

        if (invitation.getStatus()
                != ManagerInvitationStatus.PENDING) {

            throw new BadRequestException(
                    "Invitation has already been used."
            );

        }

        if (invitation.getExpiresAt()
                .isBefore(LocalDateTime.now())) {

            throw new BadRequestException(
                    "Invitation has expired."
            );

        }

        return invitation;

    }
}