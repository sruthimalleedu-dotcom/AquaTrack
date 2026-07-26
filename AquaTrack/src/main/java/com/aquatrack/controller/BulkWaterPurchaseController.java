package com.aquatrack.controller;

import com.aquatrack.dto.bulkWaterPurchase.BulkWaterPurchaseResponseDto;
import com.aquatrack.dto.bulkWaterPurchase.CreateBulkWaterPurchaseRequestDto;
import com.aquatrack.dto.bulkWaterPurchase.UpdateBulkWaterPurchaseRequestDto;
import com.aquatrack.service.BulkWaterPurchaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager/bulk-water-purchases")
@RequiredArgsConstructor
public class BulkWaterPurchaseController {

    private final BulkWaterPurchaseService bulkWaterPurchaseService;

    @PostMapping
    public ResponseEntity<BulkWaterPurchaseResponseDto> createBulkWaterPurchase(
            @Valid @RequestBody CreateBulkWaterPurchaseRequestDto requestDto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bulkWaterPurchaseService.createBulkWaterPurchase(requestDto));
    }

    @GetMapping("/{purchaseId}")
    public ResponseEntity<BulkWaterPurchaseResponseDto> getBulkWaterPurchaseById(
            @PathVariable Long purchaseId) {

        return ResponseEntity.ok(
                bulkWaterPurchaseService.getBulkWaterPurchaseById(purchaseId));
    }

    @GetMapping
    public ResponseEntity<List<BulkWaterPurchaseResponseDto>> getAllBulkWaterPurchases() {

        return ResponseEntity.ok(
                bulkWaterPurchaseService.getAllBulkWaterPurchases());
    }

    @PutMapping("/{purchaseId}")
    public ResponseEntity<BulkWaterPurchaseResponseDto> updateBulkWaterPurchase(
            @PathVariable Long purchaseId,
            @Valid @RequestBody UpdateBulkWaterPurchaseRequestDto requestDto) {

        return ResponseEntity.ok(
                bulkWaterPurchaseService.updateBulkWaterPurchase(
                        purchaseId,
                        requestDto));
    }

    @DeleteMapping("/{purchaseId}")
    public ResponseEntity<Void> deleteBulkWaterPurchase(
            @PathVariable Long purchaseId) {

        bulkWaterPurchaseService.deleteBulkWaterPurchase(purchaseId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/building/{buildingId}")
    public ResponseEntity<List<BulkWaterPurchaseResponseDto>> getByBuilding(
            @PathVariable Long buildingId) {

        return ResponseEntity.ok(
                bulkWaterPurchaseService.getBulkWaterPurchasesByBuilding(buildingId));
    }

    @GetMapping("/billing-cycle/{billingCycleId}")
    public ResponseEntity<List<BulkWaterPurchaseResponseDto>> getByBillingCycle(
            @PathVariable Long billingCycleId) {

        return ResponseEntity.ok(
                bulkWaterPurchaseService.getBulkWaterPurchasesByBillingCycle(billingCycleId));
    }
}
