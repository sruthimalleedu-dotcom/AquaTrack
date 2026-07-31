package com.aquatrack.service;

import com.aquatrack.dto.bills.GenerateBillsRequestDto;
import com.aquatrack.dto.bills.UpdateBillStatusRequestDto;
import com.aquatrack.dto.bills.WaterBillResponseDto;
import com.aquatrack.dto.bills.WaterBillSummaryResponseDto;
import org.springframework.core.io.Resource;

public interface WaterBillService {

    // ==========================================
    // Generate Bills
    // ==========================================

    WaterBillSummaryResponseDto generateBills(
            GenerateBillsRequestDto request
    );

    // ==========================================
    // Get Bills
    // ==========================================

    WaterBillSummaryResponseDto getBills(
            Long buildingId,
            Long billingCycleId
    );

    // ==========================================
    // Get Bill By ID
    // ==========================================

    WaterBillResponseDto getBillById(
            Long billId
    );

    // ==========================================
    // Update Bill Status
    // ==========================================

    WaterBillResponseDto updateBillStatus(
            Long billId,
            UpdateBillStatusRequestDto request
    );

    // ==========================================
    // Download Invoice PDF
    // ==========================================

    Resource downloadInvoice(
            Long billId
    );

}