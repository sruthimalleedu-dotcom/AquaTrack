package com.aquatrack.dto.payment;

import com.aquatrack.enums.PaymentStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePaymentStatusRequestDto {

    // ==========================================
    // Payment Status
    // ==========================================

    @NotNull(message = "Payment status is required.")
    private PaymentStatus paymentStatus;

    // ==========================================
    // Transaction Details
    // ==========================================

    @Size(
            max = 150,
            message = "Transaction ID cannot exceed 150 characters."
    )
    private String transactionId;

    // ==========================================
    // Remarks
    // ==========================================

    @Size(
            max = 500,
            message = "Remarks cannot exceed 500 characters."
    )
    private String remarks;

}
