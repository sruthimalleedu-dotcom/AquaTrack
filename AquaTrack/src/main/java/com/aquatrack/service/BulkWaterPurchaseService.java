package com.aquatrack.service;

import com.aquatrack.dto.bulkWaterPurchase.BulkWaterPurchaseResponseDto;
import com.aquatrack.dto.bulkWaterPurchase.CreateBulkWaterPurchaseRequestDto;
import com.aquatrack.dto.bulkWaterPurchase.UpdateBulkWaterPurchaseRequestDto;

import java.util.List;

public interface BulkWaterPurchaseService {

    BulkWaterPurchaseResponseDto createBulkWaterPurchase(
            CreateBulkWaterPurchaseRequestDto requestDto
    );

    BulkWaterPurchaseResponseDto updateBulkWaterPurchase(
            Long purchaseId,
            UpdateBulkWaterPurchaseRequestDto requestDto
    );

    BulkWaterPurchaseResponseDto getBulkWaterPurchaseById(
            Long purchaseId
    );

    List<BulkWaterPurchaseResponseDto> getAllBulkWaterPurchases();

    List<BulkWaterPurchaseResponseDto> getBulkWaterPurchasesByBuilding(
            Long buildingId
    );

    List<BulkWaterPurchaseResponseDto> getBulkWaterPurchasesByBillingCycle(
            Long billingCycleId
    );

    void deleteBulkWaterPurchase(
            Long purchaseId
    );

}