package com.aquatrack.dto.bills;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WaterBillSummaryResponseDto {

    // ==========================================
    // Building Information
    // ==========================================

    private Long buildingId;

    private String buildingName;

    // ==========================================
    // Billing Cycle
    // ==========================================

    private Long billingCycleId;

    private String billingCycleName;

    // ==========================================
    // Summary
    // ==========================================

    private Integer totalBills;

    private Integer paidBills;

    private Integer pendingBills;

    private Integer overdueBills;

    private BigDecimal totalConsumptionKL;

    private BigDecimal totalBillAmount;

    // ==========================================
    // Bills
    // ==========================================

    private List<WaterBillResponseDto> bills;

}