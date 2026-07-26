package com.aquatrack.service;

import com.aquatrack.dto.billingcycle.BillingCycleResponseDto;
import com.aquatrack.dto.billingcycle.CreateBillingCycleRequestDto;
import com.aquatrack.dto.billingcycle.UpdateBillingCycleRequestDto;

import java.util.List;

public interface BillingCycleService {

    // ==========================================
    // Create
    // ==========================================

    BillingCycleResponseDto createBillingCycle(
            CreateBillingCycleRequestDto requestDto
    );

    // ==========================================
    // Read
    // ==========================================

    /**
     * Get all billing cycles accessible to the logged-in manager.
     */
    List<BillingCycleResponseDto> getAllBillingCycles();

    /**
     * Get billing cycle by ID.
     */
    BillingCycleResponseDto getBillingCycleById(
            Long billingCycleId
    );

    /**
     * Get billing cycles of a building.
     */
    List<BillingCycleResponseDto> getBillingCyclesByBuilding(
            Long buildingId
    );

    // ==========================================
    // Update
    // ==========================================

    BillingCycleResponseDto updateBillingCycle(
            Long billingCycleId,
            UpdateBillingCycleRequestDto requestDto
    );

    // ==========================================
    // Billing Status
    // ==========================================

    /**
     * Close an OPEN billing cycle.
     */
    BillingCycleResponseDto closeBillingCycle(
            Long billingCycleId
    );

    // ==========================================
    // Delete
    // ==========================================

    void deleteBillingCycle(
            Long billingCycleId
    );

}