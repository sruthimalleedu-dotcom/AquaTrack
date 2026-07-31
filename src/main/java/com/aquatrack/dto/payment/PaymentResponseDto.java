package com.aquatrack.dto.payment;

import com.aquatrack.enums.PaymentMethod;
import com.aquatrack.enums.PaymentStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDto {

    // ==========================================
    // Payment Information
    // ==========================================

    private Long paymentId;

    private String transactionId;

    private PaymentStatus paymentStatus;

    private PaymentMethod paymentMethod;

    // ==========================================
    // Water Bill Information
    // ==========================================

    private Long waterBillId;

    private String invoiceNumber;

    private String billingCycle;

    // ==========================================
    // Payment Amount
    // ==========================================

    private BigDecimal amount;

    // ==========================================
    // Dates
    // ==========================================

    private LocalDate paymentDate;

    private LocalDate dueDate;

    // ==========================================
    // Additional Information
    // ==========================================

    private String remarks;

}