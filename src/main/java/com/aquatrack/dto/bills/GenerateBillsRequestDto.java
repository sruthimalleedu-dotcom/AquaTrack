package com.aquatrack.dto.bills;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenerateBillsRequestDto {

    // ==========================================
    // Building
    // ==========================================

    @NotNull(message = "Building ID is required.")
    private Long buildingId;

    // ==========================================
    // Billing Cycle
    // ==========================================

    @NotNull(message = "Billing Cycle ID is required.")
    private Long billingCycleId;

    // ==========================================
    // Common Area Usage
    // ==========================================

    @NotNull(message = "Common area usage is required.")
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal commonAreaUsage;

}