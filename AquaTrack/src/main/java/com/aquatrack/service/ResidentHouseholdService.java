package com.aquatrack.service;

import com.aquatrack.dto.resident.ResidentHouseholdResponseDto;

public interface ResidentHouseholdService {

    // ==========================================
    // My Household
    // ==========================================

    /**
     * Returns the household details of the
     * currently logged-in resident.
     *
     * @return Resident household details
     */
    ResidentHouseholdResponseDto getMyHousehold();

}