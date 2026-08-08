package com.aquatrack.dto.bills;

import com.aquatrack.enums.BillStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WaterBillResponseDto {

    // ==========================================
    // Bill Information
    // ==========================================

    private Long billId;

    private String invoiceNumber;

    private BillStatus billStatus;

    // ==========================================
    // Household Information
    // ==========================================

    private Long householdId;

    private String householdNumber;

    private String residentName;

    // ==========================================
    // Billing Cycle
    // ==========================================

    private Long billingCycleId;

    private String billingCycleName;

    // ==========================================
    // Consumption Details
    // ==========================================

    private BigDecimal consumptionKL;

    private BigDecimal usagePercentage;

    // ==========================================
    // Billing Details
    // ==========================================

    private BigDecimal costPerKL;

    private BigDecimal sharedWaterCost;

    private BigDecimal tariffCharge;

    private BigDecimal adjustmentAmount;

    private BigDecimal totalAmount;

    // ==========================================
    // Dates
    // ==========================================

    private LocalDate generatedDate;

    private LocalDate dueDate;

}