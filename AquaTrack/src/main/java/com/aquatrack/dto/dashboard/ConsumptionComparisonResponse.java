package com.aquatrack.dto.dashboard;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsumptionComparisonResponse {

    private BigDecimal householdUsage;

    private BigDecimal apartmentAverage;

    private BigDecimal difference;

    private String message;
}