package com.aquatrack.dto.dashboard;

import com.aquatrack.enums.PaymentMethod;
import com.aquatrack.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Response DTO for Recent Payments.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentPaymentDto {

    /**
     * Transaction ID.
     */
    private String transactionId;

    /**
     * Invoice number.
     */
    private String invoiceNumber;

    /**
     * House number.
     */
    private String houseNumber;

    /**
     * Resident name.
     */
    private String residentName;

    /**
     * Payment method.
     */
    private PaymentMethod paymentMethod;

    /**
     * Amount paid.
     */
    private BigDecimal amount;

    /**
     * Payment status.
     */
    private PaymentStatus paymentStatus;

    /**
     * Payment date.
     */
    private LocalDateTime paymentDate;

}