package com.aquatrack.dto.household;

import com.aquatrack.enums.HouseholdStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HouseholdResponse {

    // ==========================================
    // Household
    // ==========================================

    private Long id;

    private String houseNumber;

    /**
     * Temporary field.
     * Will be removed after Water Meter module.
     */
    private String meterNumber;

    private HouseholdStatus status;



    // ==========================================
    // Parent Information
    // ==========================================

    private Long apartmentId;

    private String apartmentName;

    // ==========================================
    // Building Information
// ==========================================

    private Long buildingId;

    private String buildingName;

    private Long floorId;

    private String floorName;

    // ==========================================
    // Statistics
    // ==========================================

    /**
     * Calculated from User table.
     */
    private Long totalResidents;

    // ==========================================
    // Audit
    // ==========================================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}