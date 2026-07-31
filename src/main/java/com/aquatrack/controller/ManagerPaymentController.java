package com.aquatrack.controller;

import com.aquatrack.dto.payment.PaymentResponseDto;
import com.aquatrack.dto.payment.PaymentSummaryResponseDto;
import com.aquatrack.dto.payment.UpdatePaymentStatusRequestDto;
import com.aquatrack.service.ManagerPaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager/payments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('MANAGER')")
public class ManagerPaymentController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final ManagerPaymentService managerPaymentService;

    // ==========================================
    // Get All Payments
    // ==========================================

    @GetMapping
    public ResponseEntity<List<PaymentResponseDto>> getAllPayments() {

        return ResponseEntity.ok(
                managerPaymentService.getAllPayments()
        );

    }

    // ==========================================
    // Get Payment By ID
    // ==========================================

    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentResponseDto> getPaymentById(
            @PathVariable Long paymentId
    ) {

        return ResponseEntity.ok(
                managerPaymentService.getPaymentById(paymentId)
        );

    }

    // ==========================================
    // Get Payment Summary
    // ==========================================

    @GetMapping("/summary")
    public ResponseEntity<PaymentSummaryResponseDto> getPaymentSummary() {

        return ResponseEntity.ok(
                managerPaymentService.getPaymentSummary()
        );

    }

    // ==========================================
    // Update Payment Status
    // ==========================================

    @PutMapping("/{paymentId}/status")
    public ResponseEntity<PaymentResponseDto> updatePaymentStatus(
            @PathVariable Long paymentId,
            @Valid @RequestBody UpdatePaymentStatusRequestDto requestDto
    ) {

        return ResponseEntity.ok(
                managerPaymentService.updatePaymentStatus(
                        paymentId,
                        requestDto
                )
        );

    }

    // ==========================================
    // Get Household Payments
    // ==========================================

    @GetMapping("/household/{householdId}")
    public ResponseEntity<List<PaymentResponseDto>> getPaymentsByHousehold(
            @PathVariable Long householdId
    ) {

        return ResponseEntity.ok(
                managerPaymentService.getPaymentsByHousehold(
                        householdId
                )
        );

    }

}