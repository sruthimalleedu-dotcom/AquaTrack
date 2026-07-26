package com.aquatrack.service;

import com.aquatrack.dto.waterusage.CreateWaterUsageRequestDto;
import com.aquatrack.dto.waterusage.UpdateWaterUsageRequestDto;
import com.aquatrack.dto.waterusage.WaterUsageResponseDto;

import java.util.List;

public interface WaterUsageService {

    /**
     * Create a new water usage log.
     */
    WaterUsageResponseDto createWaterUsage(
            Long householdId,
            CreateWaterUsageRequestDto requestDto
    );

    /**
     * Update an existing water usage log.
     */
    WaterUsageResponseDto updateWaterUsage(
            Long householdId,
            Long waterUsageId,
            UpdateWaterUsageRequestDto requestDto
    );

    /**
     * Get a water usage log by Id.
     */
    WaterUsageResponseDto getWaterUsageById(
            Long householdId,
            Long waterUsageId
    );

    /**
     * Get all water usage logs of a household.
     */
    List<WaterUsageResponseDto> getAllWaterUsage(
            Long householdId
    );

    /**
     * Delete a water usage log.
     */
    void deleteWaterUsage(
            Long householdId,
            Long waterUsageId
    );

}
