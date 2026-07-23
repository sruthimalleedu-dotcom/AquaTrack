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
public class DistributionResponseDto {

    private Long householdId;

    private String householdNumber;

    private String residentName;

    private BigDecimal usageKL;

    private BigDecimal usagePercentage;

    private BigDecimal chargeAmount;

}
