package com.aquatrack.service.impl;

import com.aquatrack.dto.payment.CreatePaymentRequestDto;
import com.aquatrack.dto.payment.PaymentResponseDto;
import com.aquatrack.dto.payment.PaymentSummaryResponseDto;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.Payment;
import com.aquatrack.entity.User;
import com.aquatrack.entity.WaterBill;
import com.aquatrack.enums.PaymentStatus;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.PaymentRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.repository.WaterBillRepository;
import com.aquatrack.service.PaymentService;
import com.aquatrack.service.ResidentPaymentService;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ResidentPaymentServiceImpl implements ResidentPaymentService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PaymentService paymentService;
    private final PaymentRepository paymentRepository;
    private final WaterBillRepository waterBillRepository;
    private final UserRepository userRepository;

    // ==========================================
    // Get My Payments
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponseDto> getMyPayments() {

        Household household = getCurrentResident().getHousehold();

        return paymentRepository.findByWaterBill_Household(household)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());

    }

    // ==========================================
    // Get My Payment By ID
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public PaymentResponseDto getMyPaymentById(Long paymentId) {

        Household household = getCurrentResident().getHousehold();

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found.")
                );

        if (!payment.getWaterBill().getHousehold().getId().equals(household.getId())) {

            throw new ResourceNotFoundException("Payment not found.");

        }

        return mapToResponseDto(payment);

    }

    // ==========================================
    // Get My Payment Summary
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public PaymentSummaryResponseDto getMyPaymentSummary() {

        Household household = getCurrentResident().getHousehold();

        List<Payment> payments =
                paymentRepository.findByWaterBill_Household(household);

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
    // Pay My Water Bill
    // ==========================================

    @Override
    public PaymentResponseDto payMyWaterBill(
            CreatePaymentRequestDto requestDto
    ) {

        Household household = getCurrentResident().getHousehold();

        WaterBill waterBill = waterBillRepository.findById(requestDto.getWaterBillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Water bill not found.")
                );

        if (!waterBill.getHousehold().getId().equals(household.getId())) {

            throw new ResourceNotFoundException("Water bill not found.");

        }

        return paymentService.createPayment(requestDto);

    }

    // ==========================================
    // Helper Methods
    // ==========================================

    private User getCurrentResident() {

        String email = SecurityUtil.getCurrentUserEmail();

        User resident = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resident not found.")
                );

        if (resident.getRole() != UserRole.RESIDENT) {

            throw new ResourceNotFoundException("Resident not found.");

        }

        return resident;

    }

    private PaymentResponseDto mapToResponseDto(Payment payment) {

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

}