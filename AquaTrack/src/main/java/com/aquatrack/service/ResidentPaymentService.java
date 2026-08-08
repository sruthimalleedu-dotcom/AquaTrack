package com.aquatrack.service;

import com.aquatrack.dto.payment.CreatePaymentRequestDto;
import com.aquatrack.dto.payment.PaymentResponseDto;
import com.aquatrack.dto.payment.PaymentSummaryResponseDto;

import java.util.List;

public interface ResidentPaymentService {

    // ==========================================
    // Get My Payments
    // ==========================================

    List<PaymentResponseDto> getMyPayments();

    // ==========================================
    // Get My Payment By ID
    // ==========================================

    PaymentResponseDto getMyPaymentById(
            Long paymentId
    );

    // ==========================================
    // Get My Payment Summary
    // ==========================================

    PaymentSummaryResponseDto getMyPaymentSummary();

    // ==========================================
    // Pay My Water Bill
    // ==========================================

    PaymentResponseDto payMyWaterBill(
            CreatePaymentRequestDto requestDto
    );

}
