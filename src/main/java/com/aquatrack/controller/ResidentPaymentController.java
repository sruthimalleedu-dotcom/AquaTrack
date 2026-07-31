package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.payment.CreatePaymentRequestDto;
import com.aquatrack.dto.payment.PaymentResponseDto;
import com.aquatrack.dto.payment.PaymentSummaryResponseDto;
import com.aquatrack.service.ResidentPaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resident/payments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('RESIDENT')")
public class ResidentPaymentController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final ResidentPaymentService residentPaymentService;

    // ==========================================
    // Get My Payments
    // ==========================================

    @GetMapping
    public ApiResponse<List<PaymentResponseDto>> getMyPayments() {

        return ApiResponse.success(
                "Payments retrieved successfully.",
                residentPaymentService.getMyPayments()
        );

    }

    // ==========================================
    // Get My Payment By ID
    // ==========================================

    @GetMapping("/{paymentId}")
    public ApiResponse<PaymentResponseDto> getMyPaymentById(
            @PathVariable Long paymentId
    ) {

        return ApiResponse.success(
                "Payment retrieved successfully.",
                residentPaymentService.getMyPaymentById(paymentId)
        );

    }

    // ==========================================
    // Get My Payment Summary
    // ==========================================

    @GetMapping("/summary")
    public ApiResponse<PaymentSummaryResponseDto> getMyPaymentSummary() {

        return ApiResponse.success(
                "Payment summary retrieved successfully.",
                residentPaymentService.getMyPaymentSummary()
        );

    }

    // ==========================================
    // Pay My Water Bill
    // ==========================================

    @PostMapping
    public ApiResponse<PaymentResponseDto> payMyWaterBill(
            @Valid @RequestBody CreatePaymentRequestDto requestDto
    ) {

        return ApiResponse.success(
                "Payment initiated successfully.",
                residentPaymentService.payMyWaterBill(requestDto)
        );

    }

}