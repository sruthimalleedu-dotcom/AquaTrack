package com.aquatrack.dto.payment;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSummaryResponseDto {

    // ==========================================
    // Payment Counts
    // ==========================================

    private Long totalPayments;

    private Long successfulPayments;

    private Long pendingPayments;

    private Long failedPayments;

    private Long cancelledPayments;

    // ==========================================
    // Payment Amount Summary
    // ==========================================

    private BigDecimal totalPaidAmount;

    private BigDecimal pendingAmount;

}