package com.aquatrack.dto.distribution;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenerateDistributionRequestDto {

    @NotNull(message = "Building ID is required")
    private Long buildingId;

    @NotNull(message = "Billing Cycle ID is required")
    private Long billingCycleId;

    @Builder.Default
    @DecimalMin(value = "0.0", inclusive = true, message = "Common area usage cannot be negative")
    private BigDecimal commonAreaUsage = BigDecimal.ZERO;

}