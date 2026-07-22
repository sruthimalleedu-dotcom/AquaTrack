package com.aquatrack.dto.resident;

import com.aquatrack.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResidentResponse {

    // ==========================================
    // Resident Information
    // ==========================================

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    /**
     * User Account Status
     */
    private boolean isActive;

    // ==========================================
    // Household Information
    // ==========================================

    private Long householdId;

    private String houseNumber;

    /**
     * Read-only information.
     * Every household has exactly one water meter.
     */
    private String meterNumber;

    // ==========================================
    // Floor Information
    // ==========================================

    private Long floorId;

    private String floorName;

    // ==========================================
    // Apartment Information
    // ==========================================

    private Long apartmentId;

    private String apartmentName;

    // ==========================================
    // Audit Information
    // ==========================================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}