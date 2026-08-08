package com.aquatrack.dto.payment;

import com.aquatrack.enums.PaymentMethod;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePaymentRequestDto {

    // ==========================================
    // Water Bill
    // ==========================================

    @NotNull(message = "Water bill ID is required.")
    private Long waterBillId;

    // ==========================================
    // Payment Details
    // ==========================================

    @NotNull(message = "Payment amount is required.")
    @DecimalMin(
            value = "0.01",
            inclusive = true,
            message = "Payment amount must be greater than zero."
    )
    private BigDecimal amount;

    @NotNull(message = "Payment method is required.")
    private PaymentMethod paymentMethod;

    @Size(
            max = 500,
            message = "Remarks cannot exceed 500 characters."
    )
    private String remarks;

}
