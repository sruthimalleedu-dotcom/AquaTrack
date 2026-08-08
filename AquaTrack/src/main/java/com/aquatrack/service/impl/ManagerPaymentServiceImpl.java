package com.aquatrack.service.impl;

import com.aquatrack.dto.payment.PaymentResponseDto;
import com.aquatrack.dto.payment.PaymentSummaryResponseDto;
import com.aquatrack.dto.payment.UpdatePaymentStatusRequestDto;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.ManagerBuilding;
import com.aquatrack.entity.Payment;
import com.aquatrack.entity.User;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.HouseholdRepository;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.PaymentRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.ManagerPaymentService;
import com.aquatrack.service.PaymentService;
import com.aquatrack.util.SecurityUtil;
import com.aquatrack.enums.PaymentStatus;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ManagerPaymentServiceImpl implements ManagerPaymentService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PaymentRepository paymentRepository;
    private final HouseholdRepository householdRepository;
    private final ManagerBuildingRepository managerBuildingRepository;
    private final UserRepository userRepository;
    private final PaymentService paymentService;
// ==========================================
// Get All Assigned Building Payments
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponseDto> getAllPayments() {

        List<Building> assignedBuildings = getAssignedBuildings();

        return assignedBuildings.stream()
                .flatMap(building ->
                        paymentRepository
                                .findByWaterBill_Household_Floor_Building(building)
                                .stream()
                )
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());

    }
// ==========================================
// Get Payment Summary
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public PaymentSummaryResponseDto getPaymentSummary() {

        List<Building> assignedBuildings = getAssignedBuildings();

        List<Payment> payments = assignedBuildings.stream()
                .flatMap(building ->
                        paymentRepository
                                .findByWaterBill_Household_Floor_Building(building)
                                .stream()
                )
                .collect(Collectors.toList());

        long totalPayments = payments.size();

        long successfulPayments = payments.stream()
                .filter(payment ->
                        payment.getPaymentStatus() == PaymentStatus.SUCCESS)
                .count();

        long pendingPayments = payments.stream()
                .filter(payment ->
                        payment.getPaymentStatus() == PaymentStatus.PENDING)
                .count();

        long failedPayments = payments.stream()
                .filter(payment ->
                        payment.getPaymentStatus() == PaymentStatus.FAILED)
                .count();

        long cancelledPayments = payments.stream()
                .filter(payment ->
                        payment.getPaymentStatus() == PaymentStatus.CANCELLED)
                .count();

        BigDecimal totalPaidAmount = payments.stream()
                .filter(payment ->
                        payment.getPaymentStatus() == PaymentStatus.SUCCESS)
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal pendingAmount = payments.stream()
                .filter(payment ->
                        payment.getPaymentStatus() == PaymentStatus.PENDING)
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
// Get Payment By ID
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public PaymentResponseDto getPaymentById(Long paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found.")
                );

        Building building = payment.getWaterBill()
                .getHousehold()
                .getFloor()
                .getBuilding();

        if (!isBuildingAssignedToManager(building)) {

            throw new ResourceNotFoundException("Payment not found.");

        }

        return mapToResponseDto(payment);

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

        Building building = payment.getWaterBill()
                .getHousehold()
                .getFloor()
                .getBuilding();

        if (!isBuildingAssignedToManager(building)) {

            throw new ResourceNotFoundException("Payment not found.");

        }

        return paymentService.updatePaymentStatus(
                paymentId,
                requestDto
        );

    }

// ==========================================
// Get Household Payments
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponseDto> getPaymentsByHousehold(
            Long householdId
    ) {

        Household household = householdRepository.findById(householdId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Household not found.")
                );

        Building building = household.getFloor().getBuilding();

        if (!isBuildingAssignedToManager(building)) {

            throw new ResourceNotFoundException("Household not found.");

        }

        return paymentRepository.findByWaterBill_Household(household)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());

    }
// ==========================================
    // Helper Methods
    // ==========================================

    /**
     * Returns the currently logged-in manager.
     */
    private User getCurrentManager() {

        String email = SecurityUtil.getCurrentUserEmail();

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Manager not found.")
                );

        if (manager.getRole() != UserRole.MANAGER) {

            throw new ResourceNotFoundException("Manager not found.");

        }

        return manager;

    }

    /**
     * Returns all buildings assigned to the current manager.
     */
    private List<Building> getAssignedBuildings() {

        User manager = getCurrentManager();

        List<ManagerBuilding> assignments =
                managerBuildingRepository.findByManager(manager);

        if (assignments.isEmpty()) {

            throw new ResourceNotFoundException(
                    "No building assigned to the manager."
            );

        }

        return assignments.stream()
                .map(ManagerBuilding::getBuilding)
                .collect(Collectors.toList());

    }

    /**
     * Checks whether a building belongs to the manager.
     */
    private boolean isBuildingAssignedToManager(
            Building building
    ) {

        User manager = getCurrentManager();

        return managerBuildingRepository.existsByManagerAndBuilding(
                manager,
                building
        );

    }

    /**
     * Converts Payment entity to DTO.
     */
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
}