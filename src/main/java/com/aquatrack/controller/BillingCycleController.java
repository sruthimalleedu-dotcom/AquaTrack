package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.billingcycle.BillingCycleResponseDto;
import com.aquatrack.dto.billingcycle.CreateBillingCycleRequestDto;
import com.aquatrack.dto.billingcycle.UpdateBillingCycleRequestDto;
import com.aquatrack.service.BillingCycleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager/billing-cycles")
@RequiredArgsConstructor
public class BillingCycleController {

    private final BillingCycleService billingCycleService;

    // ==========================================
    // Create Billing Cycle
    // ==========================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<BillingCycleResponseDto> createBillingCycle(
            @Valid @RequestBody CreateBillingCycleRequestDto request
    ) {

        BillingCycleResponseDto response =
                billingCycleService.createBillingCycle(request);

        return ApiResponse.success(
                "Billing cycle created successfully.",
                response
        );

    }

    // ==========================================
    // Get All Billing Cycles
    // ==========================================

    @GetMapping
    public ApiResponse<List<BillingCycleResponseDto>> getAllBillingCycles() {

        List<BillingCycleResponseDto> response =
                billingCycleService.getAllBillingCycles();

        return ApiResponse.success(
                "Billing cycles fetched successfully.",
                response
        );

    }

    // ==========================================
    // Get Billing Cycle By ID
    // ==========================================

    @GetMapping("/{billingCycleId}")
    public ApiResponse<BillingCycleResponseDto> getBillingCycleById(
            @PathVariable Long billingCycleId
    ) {

        BillingCycleResponseDto response =
                billingCycleService.getBillingCycleById(
                        billingCycleId
                );

        return ApiResponse.success(
                "Billing cycle fetched successfully.",
                response
        );

    }

    // ==========================================
    // Get Billing Cycles By Building
    // ==========================================

    @GetMapping("/building/{buildingId}")
    public ApiResponse<List<BillingCycleResponseDto>> getBillingCyclesByBuilding(
            @PathVariable Long buildingId
    ) {

        List<BillingCycleResponseDto> response =
                billingCycleService.getBillingCyclesByBuilding(
                        buildingId
                );

        return ApiResponse.success(
                "Billing cycles fetched successfully.",
                response
        );

    }

    // ==========================================
    // Update Billing Cycle
    // ==========================================

    @PutMapping("/{billingCycleId}")
    public ApiResponse<BillingCycleResponseDto> updateBillingCycle(
            @PathVariable Long billingCycleId,
            @Valid @RequestBody UpdateBillingCycleRequestDto request
    ) {

        BillingCycleResponseDto response =
                billingCycleService.updateBillingCycle(
                        billingCycleId,
                        request
                );

        return ApiResponse.success(
                "Billing cycle updated successfully.",
                response
        );

    }

    // ==========================================
    // Close Billing Cycle
    // ==========================================

    @PatchMapping("/{billingCycleId}/close")
    public ApiResponse<BillingCycleResponseDto> closeBillingCycle(
            @PathVariable Long billingCycleId
    ) {

        BillingCycleResponseDto response =
                billingCycleService.closeBillingCycle(
                        billingCycleId
                );

        return ApiResponse.success(
                "Billing cycle closed successfully.",
                response
        );

    }

    // ==========================================
    // Delete Billing Cycle
    // ==========================================

    @DeleteMapping("/{billingCycleId}")
    public ApiResponse<Void> deleteBillingCycle(
            @PathVariable Long billingCycleId
    ) {

        billingCycleService.deleteBillingCycle(
                billingCycleId
        );

        return ApiResponse.success(
                "Billing cycle deleted successfully."
        );

    }

}