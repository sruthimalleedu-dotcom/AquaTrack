package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Monthly water consumption chart DTO.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyWaterConsumptionDto {

    /**
     * Billing cycle name.
     * Example: Jan-2026
     */
    private String month;

    /**
     * Total water consumed.
     */
    private BigDecimal totalConsumption;

}