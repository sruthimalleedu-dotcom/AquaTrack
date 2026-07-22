package com.aquatrack.mapper;

import com.aquatrack.dto.billingcycle.BillingCycleResponseDto;
import com.aquatrack.dto.billingcycle.CreateBillingCycleRequestDto;
import com.aquatrack.dto.billingcycle.UpdateBillingCycleRequestDto;
import com.aquatrack.entity.BillingCycle;
import org.springframework.stereotype.Component;

@Component
public class BillingCycleMapper {

    /**
     * Convert Create DTO to Entity.
     */
    public BillingCycle toEntity(CreateBillingCycleRequestDto dto) {

        if (dto == null) {
            return null;
        }

        return BillingCycle.builder()
                .cycleName(dto.getCycleName())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .dueDate(dto.getDueDate())
                .build();
    }

    /**
     * Convert Entity to Response DTO.
     */
    public BillingCycleResponseDto toResponseDto(BillingCycle billingCycle) {

        if (billingCycle == null) {
            return null;
        }

        return BillingCycleResponseDto.builder()
                .id(billingCycle.getId())
                .cycleName(billingCycle.getCycleName())
                .startDate(billingCycle.getStartDate())
                .endDate(billingCycle.getEndDate())
                .dueDate(billingCycle.getDueDate())
                .billingStatus(billingCycle.getBillingStatus())

                .buildingId(
                        billingCycle.getBuilding() != null
                                ? billingCycle.getBuilding().getId()
                                : null
                )

                .buildingName(
                        billingCycle.getBuilding() != null
                                ? billingCycle.getBuilding().getBuildingName()
                                : null
                )

                .createdAt(billingCycle.getCreatedAt())
                .updatedAt(billingCycle.getUpdatedAt())
                .build();
    }

    /**
     * Update existing entity from Update DTO.
     */
    public void updateEntity(
            UpdateBillingCycleRequestDto dto,
            BillingCycle billingCycle
    ) {

        if (dto == null || billingCycle == null) {
            return;
        }

        billingCycle.setCycleName(dto.getCycleName());
        billingCycle.setStartDate(dto.getStartDate());
        billingCycle.setEndDate(dto.getEndDate());
        billingCycle.setDueDate(dto.getDueDate());
    }

}