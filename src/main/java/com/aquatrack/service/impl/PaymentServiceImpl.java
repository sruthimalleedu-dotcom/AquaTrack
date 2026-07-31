package com.aquatrack.service.impl;

import com.aquatrack.dto.payment.CreatePaymentRequestDto;
import com.aquatrack.dto.payment.PaymentResponseDto;
import com.aquatrack.dto.payment.PaymentSummaryResponseDto;
import com.aquatrack.dto.payment.UpdatePaymentStatusRequestDto;
import com.aquatrack.entity.Payment;
import com.aquatrack.entity.WaterBill;
import com.aquatrack.enums.BillStatus;
import com.aquatrack.enums.PaymentStatus;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.PaymentRepository;
import com.aquatrack.repository.WaterBillRepository;
import com.aquatrack.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PaymentRepository paymentRepository;
    private final WaterBillRepository waterBillRepository;

    // ==========================================
    // Create Payment
    // ==========================================

    @Override
    public PaymentResponseDto createPayment(
            CreatePaymentRequestDto requestDto
    ) {

        WaterBill waterBill = waterBillRepository.findById(requestDto.getWaterBillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Water bill not found.")
                );

        Payment payment = Payment.builder()
                .waterBill(waterBill)
                .amount(requestDto.getAmount())
                .paymentMethod(requestDto.getPaymentMethod())
                .paymentStatus(PaymentStatus.PENDING)
                .transactionId(generateTransactionId())
                .paymentDate(LocalDate.now())
                .remarks(requestDto.getRemarks())
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        return mapToResponseDto(savedPayment);

    }

    // ==========================================
    // Update Payment Status
    // ==========================================

    @Override
    public PaymentResponseDto updatePaymentStatus(
            Long paymentId,
            UpdatePaymentStatusRequestDto requestDto
    ) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found.")
                );

        payment.setPaymentStatus(requestDto.getPaymentStatus());

        if (requestDto.getTransactionId() != null &&
                !requestDto.getTransactionId().isBlank()) {

            payment.setTransactionId(requestDto.getTransactionId());

        }

        payment.setRemarks(requestDto.getRemarks());

        WaterBill waterBill = payment.getWaterBill();

        if (requestDto.getPaymentStatus() == PaymentStatus.SUCCESS) {

            waterBill.setBillStatus(BillStatus.PAID);

        } else {

            waterBill.setBillStatus(BillStatus.PENDING);

        }

        waterBillRepository.save(waterBill);

        Payment updatedPayment = paymentRepository.save(payment);

        return mapToResponseDto(updatedPayment);

    }

    // ==========================================
    // Get Payment By ID
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public PaymentResponseDto getPaymentById(Long paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found.")
                );

        return mapToResponseDto(payment);

    }

    // ==========================================
    // Get Payments By Water Bill
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponseDto> getPaymentsByWaterBill(
            Long waterBillId
    ) {

        WaterBill waterBill = waterBillRepository.findById(waterBillId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Water bill not found.")
                );

        return paymentRepository.findByWaterBill(waterBill)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());

    }

    // ==========================================
    // Get Payment Summary
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public PaymentSummaryResponseDto getPaymentSummary() {

        List<Payment> payments = paymentRepository.findAll();

        long totalPayments = payments.size();

        long successfulPayments = payments.stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.SUCCESS)
                .count();

        long pendingPayments = payments.stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.PENDING)
                .count();

        long failedPayments = payments.stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.FAILED)
                .count();

        long cancelledPayments = payments.stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.CANCELLED)
                .count();

        BigDecimal totalPaidAmount = payments.stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.SUCCESS)
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal pendingAmount = payments.stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.PENDING)
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return PaymentSummaryResponseDto.builder()
                .totalPayments(totalPayments)
                .successfulPayments(successfulPayments)
                .pendingPayments(pendingPayments)
                .failedPayments(failedPayments)
                .cancelledPayments(cancelledPayments)
                .totalPaidAmount(totalPaidAmount)
                .pendingAmount(pendingAmount)
                .build();

    }

    // ==========================================
    // Entity → DTO Mapper
    // ==========================================

    private PaymentResponseDto mapToResponseDto(
            Payment payment
    ) {

        return PaymentResponseDto.builder()
                .paymentId(payment.getId())
                .transactionId(payment.getTransactionId())
                .paymentStatus(payment.getPaymentStatus())
                .paymentMethod(payment.getPaymentMethod())
                .waterBillId(payment.getWaterBill().getId())
                .invoiceNumber(payment.getWaterBill().getInvoiceNumber())
                .billingCycle(
                        payment.getWaterBill()
                                .getBillingCycle()
                                .getCycleName()
                )
                .amount(payment.getAmount())
                .paymentDate(payment.getPaymentDate())
                .dueDate(payment.getWaterBill().getDueDate())
                .remarks(payment.getRemarks())
                .build();

    }

    // ==========================================
    // Helper Methods
    // ==========================================

    private String generateTransactionId() {

        String transactionId;

        do {

            transactionId = "TXN-" + System.currentTimeMillis();

        } while (paymentRepository.existsByTransactionId(transactionId));

        return transactionId;

    }

}