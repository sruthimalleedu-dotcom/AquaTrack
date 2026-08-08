package com.aquatrack.dto.resident;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a resident belonging to the
 * logged-in user's household.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HouseholdMemberResponseDto {

    // ==========================================
    // Resident Information
    // ==========================================

    private Long residentId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

}
