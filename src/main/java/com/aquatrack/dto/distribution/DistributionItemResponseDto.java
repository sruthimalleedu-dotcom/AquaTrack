package com.aquatrack.dto.distribution;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DistributionItemResponseDto {

    private Long householdId;

    private String householdNumber;

    private String residentName;

    private BigDecimal usageKL;

    private BigDecimal usagePercentage;

    // Cost of 1 KL of water
    private BigDecimal costPerKL;

    // usageKL × costPerKL
    private BigDecimal consumptionCost;

}