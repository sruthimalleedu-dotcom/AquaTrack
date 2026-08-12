package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Response DTO for Revenue Trend Chart.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RevenueTrendDto {

    /**
     * Billing cycle.
     * Example: Jan-2026
     */
    private String month;

    /**
     * Revenue collected.
     */
    private BigDecimal revenue;

}
