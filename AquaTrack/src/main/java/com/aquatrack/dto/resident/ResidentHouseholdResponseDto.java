package com.aquatrack.dto.resident;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response DTO containing household details
 * for the currently logged-in resident.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResidentHouseholdResponseDto {

    // ==========================================
    // Household Information
    // ==========================================

    private Long householdId;

    private String houseNumber;

    private String apartmentName;

    private String buildingName;

    private String floorName;

    private String householdStatus;

    // ==========================================
    // Water Meter
    // ==========================================

    private String meterNumber;

    // ==========================================
    // Members
    // ==========================================

    private Long totalMembers;

    private List<HouseholdMemberResponseDto> members;

}