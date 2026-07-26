package com.aquatrack.service.impl;

import com.aquatrack.dto.resident.ResidentRequest;
import com.aquatrack.dto.resident.ResidentResponse;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.User;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.ResidentMapper;
import com.aquatrack.repository.HouseholdRepository;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.ResidentService;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ResidentServiceImpl implements ResidentService {

    private final UserRepository userRepository;

    private final HouseholdRepository householdRepository;

    private final ResidentMapper residentMapper;

    private final ManagerBuildingRepository managerBuildingRepository;

    // ==========================================
    // Create Resident
    // ==========================================

    @Override
    public ResidentResponse createResident(
            Long householdId,
            ResidentRequest request
    ) {

        Household household = getAssignedHousehold(
                householdId
        );

        String email = request.getEmail().trim().toLowerCase();
        String phone = request.getPhone().trim();

        // Duplicate Email
        if (userRepository.existsByEmailIgnoreCase(email)) {

            throw new DuplicateResourceException(
                    "Email already exists."
            );

        }

        // Duplicate Phone
        if (userRepository.existsByPhone(phone)) {

            throw new DuplicateResourceException(
                    "Phone number already exists."
            );

        }

        request.setEmail(email);
        request.setPhone(phone);

        User resident = residentMapper.toEntity(
                request,
                household
        );

        User savedResident = userRepository.save(
                resident
        );

        /*
         * TODO
         * Send Resident Invitation Email
         *
         * This will be implemented after the
         * Email & Invitation module.
         */

        return residentMapper.toResponse(
                savedResident
        );

    }

    // ==========================================
// Get All Residents
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<ResidentResponse> getResidentsByHousehold(
            Long householdId
    ) {

        Household household = getAssignedHousehold(
                householdId
        );

        return userRepository
                .findByHouseholdIdAndRoleOrderByFirstNameAsc(
                        household.getId(),
                        UserRole.RESIDENT
                )
                .stream()
                .map(residentMapper::toResponse)
                .toList();

    }

    // ==========================================
    // Get Resident By ID
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public ResidentResponse getResidentById(
            Long householdId,
            Long residentId
    ) {

        // Validate manager access
        getAssignedHousehold(
                householdId
        );

        User resident = userRepository
                .findByIdAndRoleAndHouseholdId(
                        residentId,
                        UserRole.RESIDENT,
                        householdId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resident not found with ID: " + residentId
                        )
                );

        return residentMapper.toResponse(
                resident
        );

    }

    // ==========================================
// Update Resident
// ==========================================

    @Override
    public ResidentResponse updateResident(
            Long householdId,
            Long residentId,
            ResidentRequest request
    ) {

        // Validate manager access
        getAssignedHousehold(
                householdId
        );

        User resident = userRepository
                .findByIdAndRoleAndHouseholdId(
                        residentId,
                        UserRole.RESIDENT,
                        householdId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resident not found with ID: " + residentId
                        )
                );

        String phone = request.getPhone().trim();

        // Duplicate Phone
        if (userRepository.existsByPhoneAndIdNot(
                phone,
                residentId
        )) {

            throw new DuplicateResourceException(
                    "Phone number already exists."
            );

        }

        request.setPhone(phone);

        residentMapper.updateEntity(
                resident,
                request
        );

        User updatedResident = userRepository.save(
                resident
        );

        return residentMapper.toResponse(
                updatedResident
        );

    }

// ==========================================
// Suspend Resident
// ==========================================

    @Override
    public void suspendResident(
            Long householdId,
            Long residentId
    ) {

        User resident = getResident(
                householdId,
                residentId
        );

        if (Boolean.FALSE.equals(resident.getIsActive())) {
            throw new DuplicateResourceException(
                    "Resident is already suspended."
            );
        }

        resident.setIsActive(false);

        userRepository.save(
                resident
        );

    }

    // ==========================================
// Reactivate Resident
// ==========================================

    @Override
    public void reactivateResident(
            Long householdId,
            Long residentId
    ) {

        User resident = getResident(
                householdId,
                residentId
        );

        if (Boolean.TRUE.equals(resident.getIsActive())) {
            throw new DuplicateResourceException(
                    "Resident is already active."
            );
        }

        resident.setIsActive(true);

        userRepository.save(
                resident
        );

    }

    // ==========================================
// Helper Methods
// ==========================================

    /**
     * Returns the household only if it belongs to a building
     * assigned to the currently logged-in Manager.
     *
     * @param householdId Household ID
     * @return Household entity
     */
    private Household getAssignedHousehold(
            Long householdId
    ) {

        // Get logged-in user's email
        String email = SecurityUtil.getCurrentUserEmail();

        // Fetch logged-in Manager
        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Logged-in manager not found."
                        ));

        // Extra safety check
        if (manager.getRole() != UserRole.MANAGER) {
            throw new AccessDeniedException(
                    "Only managers can access this resource."
            );
        }

        // Fetch Household
        Household household = householdRepository.findById(householdId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Household not found with ID: " + householdId
                        ));

        // Verify manager assignment
        if (!managerBuildingRepository.existsByManagerAndBuilding(
                manager,
                household.getFloor().getBuilding()
        )) {

            throw new AccessDeniedException(
                    "You are not assigned to this building."
            );

        }

        return household;

    }

    /**
     * Returns a resident by Household ID and Resident ID.
     *
     * @param householdId Household ID
     * @param residentId Resident ID
     * @return Resident(User) entity
     */
    private User getResident(
            Long householdId,
            Long residentId
    ) {

        // Validate household ownership
        getAssignedHousehold(
                householdId
        );

        return userRepository.findByIdAndRoleAndHouseholdId(
                        residentId,
                        UserRole.RESIDENT,
                        householdId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resident not found with ID: " + residentId
                        ));

    }

}
