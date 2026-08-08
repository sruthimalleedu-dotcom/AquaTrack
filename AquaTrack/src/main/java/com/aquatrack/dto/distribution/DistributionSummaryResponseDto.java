package com.aquatrack.dto.distribution;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DistributionSummaryResponseDto {

    // Building Information
    private Long buildingId;

    private String buildingName;

    private Long billingCycleId;

    private String billingCycleName;

    // Purchase Information
    private BigDecimal purchasedWaterKL;

    private BigDecimal purchaseCost;

    private BigDecimal costPerKL;

    // Usage Summary
    private BigDecimal householdUsageKL;

    private BigDecimal commonAreaUsageKL;

    private BigDecimal waterLossKL;

    private BigDecimal remainingWaterKL;

    // Analytics
    private BigDecimal waterUtilizationPercentage;

    private BigDecimal recoveryCost;

    // Household Distribution
    private List<DistributionItemResponseDto> households;

}