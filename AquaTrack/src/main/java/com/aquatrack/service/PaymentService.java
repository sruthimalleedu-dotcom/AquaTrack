package com.aquatrack.service;

import com.aquatrack.dto.payment.CreatePaymentRequestDto;
import com.aquatrack.dto.payment.PaymentResponseDto;
import com.aquatrack.dto.payment.PaymentSummaryResponseDto;
import com.aquatrack.dto.payment.UpdatePaymentStatusRequestDto;

import java.util.List;

public interface PaymentService {

    // ==========================================
    // Create Payment
    // ==========================================

    PaymentResponseDto createPayment(
            CreatePaymentRequestDto requestDto
    );

    // ==========================================
    // Update Payment Status
    // ==========================================

    PaymentResponseDto updatePaymentStatus(
            Long paymentId,
            UpdatePaymentStatusRequestDto requestDto
    );

    // ==========================================
    // Get Payment By ID
    // ==========================================

    PaymentResponseDto getPaymentById(
            Long paymentId
    );

    // ==========================================
    // Get Payments By Water Bill
    // ==========================================

    List<PaymentResponseDto> getPaymentsByWaterBill(
            Long waterBillId
    );

    // ==========================================
    // Get Payment Summary
    // ==========================================

    PaymentSummaryResponseDto getPaymentSummary();

}