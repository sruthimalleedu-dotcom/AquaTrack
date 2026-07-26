package com.aquatrack.dto.billingcycle;

import com.aquatrack.enums.BillingStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BillingCycleResponseDto {

    // ==========================================
    // Billing Cycle
    // ==========================================

    private Long id;

    private String cycleName;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalDate dueDate;

    private BillingStatus billingStatus;

    // ==========================================
    // Building Information
    // ==========================================

    private Long buildingId;

    private String buildingName;

    // ==========================================
    // Audit Information
    // ==========================================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
