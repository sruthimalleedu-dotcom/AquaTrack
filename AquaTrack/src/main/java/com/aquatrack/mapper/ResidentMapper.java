package com.aquatrack.mapper;

import com.aquatrack.dto.resident.ResidentRequest;
import com.aquatrack.dto.resident.ResidentResponse;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.User;
import com.aquatrack.enums.UserRole;
import org.springframework.stereotype.Component;

@Component
public class ResidentMapper {

    // ==========================================
    // Request -> Entity
    // ==========================================

    public User toEntity(
            ResidentRequest request,
            Household household) {

        return User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())

                // Resident will create password after
                // accepting the invitation email.
                .password(null)

                .role(UserRole.RESIDENT)

                // Account remains inactive until
                // invitation is accepted.
                .isActive(false)

                .apartment(household.getApartment())
                .household(household)
                .build();
    }

    // ==========================================
    // Update Existing Entity
    // ==========================================

    public void updateEntity(
            User resident,
            ResidentRequest request) {

        resident.setFirstName(request.getFirstName());
        resident.setLastName(request.getLastName());
        resident.setPhone(request.getPhone());

        // Email should not be updated because it
        // is used as the login username.
    }

    // ==========================================
    // Entity -> Response
    // ==========================================

    public ResidentResponse toResponse(
            User resident) {

        Household household = resident.getHousehold();

        return ResidentResponse.builder()
                .id(resident.getId())
                .firstName(resident.getFirstName())
                .lastName(resident.getLastName())
                .email(resident.getEmail())
                .phone(resident.getPhone())
                .isActive(Boolean.TRUE.equals(resident.getIsActive()))

                .householdId(household.getId())
                .houseNumber(household.getHouseNumber())
                .meterNumber(household.getMeterNumber())

                .floorId(household.getFloor().getId())
                .floorName(household.getFloor().getFloorName())

                .apartmentId(household.getApartment().getId())
                .apartmentName(household.getApartment().getApartmentName())

                .createdAt(resident.getCreatedAt())
                .updatedAt(resident.getUpdatedAt())
                .build();
    }

}