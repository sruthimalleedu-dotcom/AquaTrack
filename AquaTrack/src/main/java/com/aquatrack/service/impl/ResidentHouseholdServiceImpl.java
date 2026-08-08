package com.aquatrack.service.impl;

import com.aquatrack.dto.resident.HouseholdMemberResponseDto;
import com.aquatrack.dto.resident.ResidentHouseholdResponseDto;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.User;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.ResidentHouseholdService;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ResidentHouseholdServiceImpl implements ResidentHouseholdService {

    private final UserRepository userRepository;

    // ==========================================
    // My Household
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public ResidentHouseholdResponseDto getMyHousehold() {

        User resident = getCurrentResident();

        Household household = resident.getHousehold();

        if (household == null) {
            throw new ResourceNotFoundException(
                    "No household assigned to the resident."
            );
        }

        List<HouseholdMemberResponseDto> members =
                userRepository.findByHouseholdIdAndRoleOrderByFirstNameAsc(
                                household.getId(),
                                UserRole.RESIDENT
                        )
                        .stream()
                        .map(this::mapToMemberResponse)
                        .toList();

        return ResidentHouseholdResponseDto.builder()
                .householdId(household.getId())
                .houseNumber(household.getHouseNumber())
                .apartmentName(household.getApartment().getApartmentName())
                .buildingName(
                        household.getFloor()
                                .getBuilding()
                                .getBuildingName()
                )
                .floorName(
                        household.getFloor()
                                .getFloorName()
                )
                .householdStatus(
                        household.getStatus().name()
                )
                .meterNumber(
                        household.getMeterNumber()
                )
                .totalMembers(
                        (long) members.size()
                )
                .members(members)
                .build();

    }

    // ==========================================
    // Helper Methods
    // ==========================================

    /**
     * Returns the currently logged-in resident.
     *
     * @return Resident user
     */
    private User getCurrentResident() {

        String email = SecurityUtil.getCurrentUserEmail();

        User resident = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Logged-in resident not found."
                        )
                );

        if (resident.getRole() != UserRole.RESIDENT) {
            throw new AccessDeniedException(
                    "Only residents can access this resource."
            );
        }

        return resident;

    }

    /**
     * Maps User entity to Household Member DTO.
     *
     * @param resident Resident entity
     * @return Household member response
     */
    private HouseholdMemberResponseDto mapToMemberResponse(
            User resident
    ) {

        return HouseholdMemberResponseDto.builder()
                .residentId(resident.getId())
                .firstName(resident.getFirstName())
                .lastName(resident.getLastName())
                .email(resident.getEmail())
                .phone(resident.getPhone())
                .build();

    }

}