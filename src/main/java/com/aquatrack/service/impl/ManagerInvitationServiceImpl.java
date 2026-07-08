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
import org.springframework.security.access.AccessDeniedException;
import com.aquatrack.enums.ManagerInvitationStatus;
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

        // Validate building belongs to apartment
        Building building = getApartmentBuilding(
                apartment,
                requestDto.getBuildingId()
        );

        // Check existing user
        if (userRepository.existsByEmailIgnoreCase(
                requestDto.getEmail())) {

            throw new DuplicateResourceException(
                    "A user with this email already exists."
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
        ManagerInvitation invitation = managerInvitationMapper.toEntity(
                requestDto,
                apartment,
                building,
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
        // Return response
        return managerInvitationMapper.toResponseDto(savedInvitation);

    }

    // ==========================
    // Get All Manager Invitations
    // ==========================

    @Override
    @Transactional(readOnly = true)
    public List<ManagerInvitationResponseDto> getAllManagerInvitations() {

        throw new UnsupportedOperationException(
                "Implementation will be added in next step."
        );
    }

    // ==========================
    // Get Manager Invitation By ID
    // ==========================

    @Override
    @Transactional(readOnly = true)
    public ManagerInvitationResponseDto getManagerInvitationById(
            Long invitationId) {

        throw new UnsupportedOperationException(
                "Implementation will be added in next step."
        );
    }

    // ==========================
    // Activate Manager
    // ==========================

    @Override
    public void activateManager(
            ManagerActivationRequestDto requestDto) {

        throw new UnsupportedOperationException(
                "Implementation will be added in next step."
        );
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
