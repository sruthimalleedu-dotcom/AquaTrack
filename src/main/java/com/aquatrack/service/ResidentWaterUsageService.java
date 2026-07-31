package com.aquatrack.service;

import com.aquatrack.dto.resident.ResidentWaterUsageResponseDto;

import java.util.List;

public interface ResidentWaterUsageService {

    // ==========================================
    // Water Usage
    // ==========================================

    /**
     * Retrieves the complete water usage history
     * of the logged-in resident's household.
     *
     * @return list of water usage records
     */
    List<ResidentWaterUsageResponseDto> getMyWaterUsage();

}