package com.aquatrack.service;

import com.aquatrack.dto.payment.PaymentResponseDto;
import com.aquatrack.dto.payment.PaymentSummaryResponseDto;
import com.aquatrack.dto.payment.UpdatePaymentStatusRequestDto;

import java.util.List;

public interface ManagerPaymentService {

    // ==========================================
    // Get All Apartment Payments
    // ==========================================

    List<PaymentResponseDto> getAllPayments();

    // ==========================================
    // Get Payment By ID
    // ==========================================

    PaymentResponseDto getPaymentById(
            Long paymentId
    );

    // ==========================================
    // Get Payment Summary
    // ==========================================

    PaymentSummaryResponseDto getPaymentSummary();

    // ==========================================
    // Update Payment Status
    // ==========================================

    PaymentResponseDto updatePaymentStatus(
            Long paymentId,
            UpdatePaymentStatusRequestDto requestDto
    );

    // ==========================================
    // Get Household Payments
    // ==========================================

    List<PaymentResponseDto> getPaymentsByHousehold(
            Long householdId
    );

}