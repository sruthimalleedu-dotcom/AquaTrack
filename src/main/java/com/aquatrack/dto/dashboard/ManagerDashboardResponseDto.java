package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Response DTO for Manager Dashboard Summary.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerDashboardResponseDto {

    /**
     * Total households managed by the logged-in manager.
     */
    private Long totalHouseholds;

    /**
     * Total occupied households.
     */
    private Long occupiedHouseholds;

    /**
     * Total vacant households.
     */
    private Long vacantHouseholds;

    /**
     * Total residents.
     */
    private Long totalResidents;

    /**
     * Total buildings assigned to the manager.
     */
    private Long totalBuildings;

    /**
     * Total water consumed (KL).
     */
    private BigDecimal totalWaterConsumption;

    /**
     * Total bills generated.
     */
    private Long totalBills;

    /**
     * Total paid bills.
     */
    private Long paidBills;

    /**
     * Total pending bills.
     */
    private Long pendingBills;

    /**
     * Total revenue collected.
     */
    private BigDecimal totalRevenueCollected;

    /**
     * Total pending payment amount.
     */
    private BigDecimal pendingAmount;
}