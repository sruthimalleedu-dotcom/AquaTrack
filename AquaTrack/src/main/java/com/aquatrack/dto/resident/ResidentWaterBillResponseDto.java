package com.aquatrack.dto.resident;

import com.aquatrack.enums.BillStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResidentWaterBillResponseDto {

    // ==========================================
    // Bill Information
    // ==========================================

    private Long billId;

    private String invoiceNumber;

    private BillStatus billStatus;

    // ==========================================
    // Billing Cycle
    // ==========================================

    private String billingCycle;

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
