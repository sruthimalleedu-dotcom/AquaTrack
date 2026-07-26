package com.aquatrack.service.impl;

import com.aquatrack.dto.manager.CreateManagerInvitationRequestDto;
import com.aquatrack.dto.manager.ManagerActivationRequestDto;
import com.aquatrack.dto.manager.ManagerInvitationResponseDto;
import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.ManagerInvitation;
import com.aquatrack.entity.User;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.ManagerInvitationMapper;
import com.aquatrack.repository.ApartmentRepository;
import com.aquatrack.repository.BuildingRepository;
import com.aquatrack.repository.ManagerInvitationRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.ManagerInvitationService;
import com.aquatrack.util.SecurityUtil;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.BadRequestException;
import org.springframework.security.access.AccessDeniedException;
import com.aquatrack.enums.ManagerInvitationStatus;
import com.aquatrack.enums.UserRole;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.aquatrack.entity.ManagerBuilding;
import com.aquatrack.entity.ManagerInvitationBuilding;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.ManagerInvitationBuildingRepository;
import com.aquatrack.notification.model.ManagerInvitationEmailModel;
import com.aquatrack.notification.service.NotificationService;
import com.aquatrack.dto.manager.ManagerActivationDetailsResponseDto;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.time.LocalDateTime;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Transactional
public class ManagerInvitationServiceImpl
        implements ManagerInvitationService {

    // ==========================
    // Dependencies
    // ==========================

    private final ManagerInvitationRepository managerInvitationRepository;

    private final UserRepository userRepository;

    private final ApartmentRepository apartmentRepository;

    private final BuildingRepository buildingRepository;

    private final ManagerInvitationMapper managerInvitationMapper;

    private final PasswordEncoder passwordEncoder;

    private final ManagerInvitationBuildingRepository
            managerInvitationBuildingRepository;

    private final ManagerBuildingRepository
            managerBuildingRepository;

    private final NotificationService notificationService;

    // ==========================
    // Create Manager Invitation
    // ==========================

    @Override
    public ManagerInvitationResponseDto createManagerInvitation(
            CreateManagerInvitationRequestDto requestDto) {

        // Get logged-in Property Admin
        User propertyAdmin = getCurrentPropertyAdmin();

        // Validate apartment ownership
        Apartment apartment = getOwnedApartment(
                requestDto.getApartmentId()
        );

        // ==========================================
// Validate Building Assignment
// (Temporary: First Building)
// ==========================================

        if (requestDto.getBuildingIds() == null
                || requestDto.getBuildingIds().isEmpty()) {

            throw new BadRequestException(
                    "At least one building must be selected."
            );

        }

        // ==========================================
// Validate Selected Buildings
// ==========================================

        List<Building> buildings = requestDto.getBuildingIds()
                .stream()
                .map(buildingId -> getApartmentBuilding(
                        apartment,
                        buildingId
                ))
                .toList();


        // Check existing user
        if (userRepository.existsByEmailIgnoreCase(
                requestDto.getEmail())) {

            throw new DuplicateResourceException(
                    "A user with this email already exists."
            );
        }

        if (userRepository.existsByPhone(requestDto.getPhone())) {

            throw new DuplicateResourceException(
                    "A user with this phone number already exists."
            );
        }

        // Check pending invitation
        if (managerInvitationRepository.existsByEmailIgnoreCaseAndStatus(
                requestDto.getEmail(),
                ManagerInvitationStatus.PENDING)) {

            throw new DuplicateResourceException(
                    "A pending invitation already exists for this email."
            );
        }

        // Generate invitation token
        String invitationToken = UUID.randomUUID().toString();

        // Set invitation expiry
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(24);

        // Convert request to entity
        ManagerInvitation invitation =
                managerInvitationMapper.toEntity(
                        requestDto,
                        apartment,
                        propertyAdmin
                );

        // Set invitation token
        invitation.setInvitationToken(invitationToken);

        // Set invitation status
        invitation.setStatus(ManagerInvitationStatus.PENDING);

        // Set invitation expiry
        invitation.setExpiresAt(expiresAt);

        // Save manager invitation
        ManagerInvitation savedInvitation =
                managerInvitationRepository.save(invitation);
        // ==========================================
// Save Selected Buildings
// ==========================================

        for (Building building : buildings) {

            ManagerInvitationBuilding assignment =
                    ManagerInvitationBuilding.builder()
                            .managerInvitation(savedInvitation)
                            .building(building)
                            .build();

            managerInvitationBuildingRepository.save(
                    assignment
            );

        }

        // ==========================================
// Build Activation URL
// ==========================================

        String activationUrl =
                "http://localhost:5173/manager/activate?token="
                        + invitationToken;

// ==========================================
// Build Email Model
// ==========================================

        ManagerInvitationEmailModel emailModel =
                ManagerInvitationEmailModel.builder()

                        .managerName(

                                requestDto.getFirstName()

                                        + " "

                                        + (requestDto.getLastName() == null
                                        ? ""
                                        : requestDto.getLastName())

                        )

                        .email(requestDto.getEmail())

                        .apartmentName(
                                apartment.getApartmentName()
                        )

                        .buildingNames(

                                buildings.stream()
                                        .map(Building::getBuildingName)
                                        .toList()

                        )

                        .invitedBy(

                                propertyAdmin.getFirstName()

                                        + " "

                                        + (propertyAdmin.getLastName() == null
                                        ? ""
                                        : propertyAdmin.getLastName())

                        )

                        .activationUrl(
                                activationUrl
                        )

                        .build();

// ==========================================
// Send Invitation Email
// ==========================================

        notificationService.sendManagerInvitationEmail(
                emailModel
        );

        // Return response
        return managerInvitationMapper.toResponseDto(savedInvitation);

    }

    // ==========================
    // Get All Manager Invitations
    // ==========================

    @Override
    @Transactional(readOnly = true)
    public List<ManagerInvitationResponseDto> getAllManagerInvitations() {

        User propertyAdmin = getCurrentPropertyAdmin();

        return managerInvitationRepository
                .findAllByInvitedByOrderByCreatedAtDesc(propertyAdmin)
                .stream()
                .map(managerInvitationMapper::toResponseDto)
                .toList();
    }

    // ==========================
    // Get Manager Invitation By ID
    // ==========================

    @Override
    @Transactional(readOnly = true)
    public ManagerInvitationResponseDto getManagerInvitationById(
            Long invitationId) {

        User propertyAdmin = getCurrentPropertyAdmin();

        ManagerInvitation invitation = getManagerInvitation(invitationId);

        if (!invitation.getInvitedBy().getId().equals(propertyAdmin.getId())) {

            throw new ResourceNotFoundException(
                    "Manager invitation not found with ID: "
                            + invitationId
            );
        }

        return managerInvitationMapper.toResponseDto(invitation);
    }

    // ==========================================
// Get Activation Details
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public ManagerActivationDetailsResponseDto getActivationDetails(
            String token
    ) {

        // ==========================================
        // Find Invitation
        // ==========================================

        ManagerInvitation invitation =
                managerInvitationRepository
                        .findByInvitationToken(token)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid invitation token."
                                )
                        );

        // ==========================================
        // Validate Status
        // ==========================================

        if (invitation.getStatus() != ManagerInvitationStatus.PENDING) {

            throw new BadRequestException(
                    "This invitation has already been used."
            );

        }

        // ==========================================
        // Validate Expiry
        // ==========================================

        if (invitation.getExpiresAt().isBefore(LocalDateTime.now())) {

            throw new BadRequestException(
                    "This invitation has expired."
            );

        }

        // ==========================================
        // Build Response
        // ==========================================

        return ManagerActivationDetailsResponseDto.builder()

                .firstName(invitation.getFirstName())

                .lastName(invitation.getLastName())

                .email(invitation.getEmail())

                .apartmentName(
                        invitation.getApartment().getApartmentName()
                )

                .buildingNames(

                        invitation.getAssignedBuildings()
                                .stream()
                                .map(assignment ->
                                        assignment.getBuilding().getBuildingName()
                                )
                                .toList()

                )

                .build();

    }

    // ==========================
    // Activate Manager
    // ==========================

    @Override
    public void activateManager(
            ManagerActivationRequestDto requestDto) {

        // Fetch invitation using token
        ManagerInvitation invitation =
                managerInvitationRepository
                        .findByInvitationToken(
                                requestDto.getInvitationToken()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid invitation token."
                                )
                        );

        // Check invitation status
        if (invitation.getStatus() != ManagerInvitationStatus.PENDING) {

            throw new BadRequestException(
                    "Invitation has already been used."
            );
        }

        // Check invitation expiry
        if (invitation.getExpiresAt().isBefore(LocalDateTime.now())) {

            throw new BadRequestException(
                    "Invitation has expired."
            );
        }

        // Validate password confirmation
        if (!requestDto.getPassword().equals(requestDto.getConfirmPassword())) {

            throw new BadRequestException(
                    "Password and Confirm Password do not match."
            );
        }

        // Check if user already exists
        if (userRepository.existsByEmailIgnoreCase(invitation.getEmail())) {

            throw new DuplicateResourceException(
                    "A user with this email already exists."
            );
        }

        // Check if phone already exists
        if (userRepository.existsByPhone(invitation.getPhone())) {

            throw new DuplicateResourceException(
                    "A user with this phone number already exists."
            );
        }

        // Create Manager user
        User manager = User.builder()
                .firstName(invitation.getFirstName())
                .lastName(invitation.getLastName())
                .email(invitation.getEmail())
                .phone(invitation.getPhone())
                .password(
                        passwordEncoder.encode(
                                requestDto.getPassword()
                        )
                )
                .role(UserRole.MANAGER)
                .isActive(true)
                .apartment(invitation.getApartment())
                .build();

        // Save manager
        userRepository.save(manager);

        // ==========================================
// Assign Buildings To Manager
// ==========================================

        for (ManagerInvitationBuilding assignment :

                invitation.getAssignedBuildings()) {

            ManagerBuilding managerBuilding =
                    ManagerBuilding.builder()
                            .manager(manager)
                            .building(
                                    assignment.getBuilding()
                            )
                            .assignedBy(
                                    invitation.getInvitedBy()
                            )
                            .build();

            managerBuildingRepository.save(
                    managerBuilding
            );

        }

        // Update invitation
        invitation.setStatus(ManagerInvitationStatus.ACTIVATED);
        invitation.setActivatedAt(LocalDateTime.now());

        // Save invitation
        managerInvitationRepository.save(invitation);

    }

    // ==========================
    // Helper Methods
    // ==========================

    /**
     * Returns the currently logged-in Property Admin.
     *
     * @return Property Admin
     */
    private User getCurrentPropertyAdmin() {

        String email = SecurityUtil.getCurrentUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Logged-in Property Admin not found."
                        ));
    }

    /**
     * Returns apartment by ID.
     *
     * @param apartmentId Apartment ID
     * @return Apartment
     */
    private Apartment getApartment(Long apartmentId) {

        return apartmentRepository.findById(apartmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Apartment not found with ID: " + apartmentId
                        ));
    }

    /**
     * Returns building by ID.
     *
     * @param buildingId Building ID
     * @return Building
     */
    private Building getBuilding(Long buildingId) {

        return buildingRepository.findById(buildingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Building not found with ID: " + buildingId
                        ));
    }

    /**
     * Returns manager invitation by ID.
     *
     * @param invitationId Invitation ID
     * @return Manager Invitation
     */
    private ManagerInvitation getManagerInvitation(Long invitationId) {

        return managerInvitationRepository.findById(invitationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Manager invitation not found with ID: "
                                        + invitationId
                        ));
    }

    /**
     * Returns the apartment only if it belongs to the
     * currently logged-in Property Admin.
     *
     * @param apartmentId Apartment ID
     * @return Apartment entity
     */
    private Apartment getOwnedApartment(Long apartmentId) {

        // Get logged-in Property Admin
        User propertyAdmin = getCurrentPropertyAdmin();

        // Fetch apartment
        Apartment apartment = getApartment(apartmentId);

        // Verify ownership
        if (apartment.getPropertyAdmin() == null
                || !apartment.getPropertyAdmin().getId().equals(propertyAdmin.getId())) {

            throw new AccessDeniedException(
                    "You are not authorized to manage this apartment."
            );
        }

        return apartment;
    }

    /**
     * Returns the building only if it belongs to
     * the given apartment.
     *
     * @param apartment Apartment
     * @param buildingId Building ID
     * @return Building entity
     */
    private Building getApartmentBuilding(Apartment apartment,
                                          Long buildingId) {

        Building building = getBuilding(buildingId);

        if (!building.getApartment().getId().equals(apartment.getId())) {

            throw new AccessDeniedException(
                    "Selected building does not belong to the selected apartment."
            );
        }

        return building;
    }
}
