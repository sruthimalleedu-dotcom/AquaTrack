package com.aquatrack.controller;

import com.aquatrack.dto.payment.CreatePaymentRequestDto;
import com.aquatrack.dto.payment.PaymentResponseDto;
import com.aquatrack.dto.payment.PaymentSummaryResponseDto;
import com.aquatrack.dto.payment.UpdatePaymentStatusRequestDto;
import com.aquatrack.dto.ApiResponse;
import com.aquatrack.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PaymentService paymentService;

    // ==========================================
    // Create Payment
    // ==========================================

    @PostMapping
    public ApiResponse<PaymentResponseDto> createPayment(
            @Valid @RequestBody CreatePaymentRequestDto requestDto
    ) {

        return ApiResponse.success(
                "Payment created successfully.",
                paymentService.createPayment(requestDto)
        );

    }

    // ==========================================
    // Update Payment Status
    // ==========================================

    @PutMapping("/{paymentId}/status")
    public ApiResponse<PaymentResponseDto> updatePaymentStatus(
            @PathVariable Long paymentId,
            @Valid @RequestBody UpdatePaymentStatusRequestDto requestDto
    ) {

        return ApiResponse.success(
                "Payment status updated successfully.",
                paymentService.updatePaymentStatus(paymentId, requestDto)
        );

    }

    // ==========================================
    // Get Payment By ID
    // ==========================================

    @GetMapping("/{paymentId}")
    public ApiResponse<PaymentResponseDto> getPaymentById(
            @PathVariable Long paymentId
    ) {

        return ApiResponse.success(
                "Payment retrieved successfully.",
                paymentService.getPaymentById(paymentId)
        );

    }

    // ==========================================
    // Get Payments By Water Bill
    // ==========================================

    @GetMapping("/water-bill/{waterBillId}")
    public ApiResponse<List<PaymentResponseDto>> getPaymentsByWaterBill(
            @PathVariable Long waterBillId
    ) {

        return ApiResponse.success(
                "Payments retrieved successfully.",
                paymentService.getPaymentsByWaterBill(waterBillId)
        );

    }

    // ==========================================
    // Get Payment Summary
    // ==========================================

    @GetMapping("/summary")
    public ApiResponse<PaymentSummaryResponseDto> getPaymentSummary() {

        return ApiResponse.success(
                "Payment summary retrieved successfully.",
                paymentService.getPaymentSummary()
        );

    }

}