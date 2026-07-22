package com.aquatrack.mapper;

import com.aquatrack.dto.household.HouseholdRequest;
import com.aquatrack.dto.household.HouseholdResponse;
import com.aquatrack.entity.Floor;
import com.aquatrack.entity.Household;
import org.springframework.stereotype.Component;

/**
 * Mapper class for converting Household Entity and DTOs.
 */
@Component
public class HouseholdMapper {

    /**
     * Converts HouseholdRequest to Household entity.
     *
     * @param request Household request
     * @param floor Floor entity
     * @return Household entity
     */
    public Household toEntity(
            HouseholdRequest request,
            Floor floor
    ) {

        return Household.builder()
                .apartment(floor.getBuilding().getApartment())
                .floor(floor)
                .houseNumber(request.getHouseNumber())
                .meterNumber(request.getMeterNumber())
                .build();

    }

    /**
     * Updates an existing Household entity.
     *
     * @param household Existing household
     * @param request Updated household request
     */
    public void updateEntity(
            Household household,
            HouseholdRequest request
    ) {

        household.setHouseNumber(request.getHouseNumber());
        household.setMeterNumber(request.getMeterNumber());

    }

    /**
     * Converts Household entity to HouseholdResponse.
     *
     * @param household Household entity
     * @param totalResidents Total number of residents
     * @return Household response
     */
    public HouseholdResponse toResponseDto(
            Household household,
            Long totalResidents
    ) {

        return HouseholdResponse.builder()

                // ==========================================
                // Household Information
                // ==========================================

                .id(household.getId())
                .houseNumber(household.getHouseNumber())
                .meterNumber(household.getMeterNumber())
                .status(household.getStatus())

                // ==========================================
                // Apartment Information
                // ==========================================

                .apartmentId(
                        household.getApartment().getId()
                )

                .apartmentName(
                        household.getApartment().getApartmentName()
                )

                // ==========================================
                // Building Information
                // ==========================================

                .buildingId(
                        household.getFloor().getBuilding().getId()
                )

                .buildingName(
                        household.getFloor().getBuilding().getBuildingName()
                )

                // ==========================================
                // Floor Information
                // ==========================================

                .floorId(
                        household.getFloor().getId()
                )

                .floorName(
                        household.getFloor().getFloorName()
                )

                // ==========================================
                // Statistics
                // ==========================================

                .totalResidents(totalResidents)

                // ==========================================
                // Audit Information
                // ==========================================

                .createdAt(household.getCreatedAt())
                .updatedAt(household.getUpdatedAt())

                .build();

    }

}