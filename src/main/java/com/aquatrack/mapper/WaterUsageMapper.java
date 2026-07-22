package com.aquatrack.mapper;

import com.aquatrack.dto.waterusage.WaterUsageResponseDto;
import com.aquatrack.entity.WaterUsageLog;
import org.springframework.stereotype.Component;

@Component
public class WaterUsageMapper {

    /**
     * Convert Entity -> Response DTO
     */
    public WaterUsageResponseDto toResponseDto(WaterUsageLog waterUsageLog) {

        if (waterUsageLog == null) {
            return null;
        }

        return WaterUsageResponseDto.builder()
                .id(waterUsageLog.getId())

                // Household
                .householdId(waterUsageLog.getHousehold().getId())
                .houseNumber(waterUsageLog.getHousehold().getHouseNumber())

                // Building
                .buildingId(
                        waterUsageLog.getHousehold()
                                .getFloor()
                                .getBuilding()
                                .getId()
                )
                .buildingName(
                        waterUsageLog.getHousehold()
                                .getFloor()
                                .getBuilding()
                                .getBuildingName()
                )

                // Billing Cycle
                .billingCycleId(waterUsageLog.getBillingCycle().getId())
                .billingCycleName(waterUsageLog.getBillingCycle().getCycleName())

                // Reading
                .readingDate(waterUsageLog.getReadingDate())
                .previousReading(waterUsageLog.getPreviousReading())
                .currentReading(waterUsageLog.getCurrentReading())
                .waterUsage(waterUsageLog.getWaterUsage())

                // Upload Information
                .uploadType(waterUsageLog.getUploadType())

                .uploadedById(
                        waterUsageLog.getUploadedBy() != null
                                ? waterUsageLog.getUploadedBy().getId()
                                : null
                )

                .uploadedByName(
                        waterUsageLog.getUploadedBy() != null
                                ? waterUsageLog.getUploadedBy().getFirstName()
                                  + " "
                                  + waterUsageLog.getUploadedBy().getLastName()
                                : null
                )

                // Remarks
                .remarks(waterUsageLog.getRemarks())

                // Audit
                .createdAt(waterUsageLog.getCreatedAt())
                .updatedAt(waterUsageLog.getUpdatedAt())

                .build();
    }

}