package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.household.HouseholdRequest;
import com.aquatrack.service.HouseholdService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Household Management.
 *
 * Handles CRUD operations for households.
 * Only MANGER users are allowed to manage households.
 */
@RestController
@RequestMapping("/api/manager/floors/{floorId}/households")
@RequiredArgsConstructor
public class HouseholdController {

    // ==========================
    // Dependencies
    // ==========================

    private final HouseholdService householdService;

    // ==========================
    // Create Household
    // ==========================

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createHousehold(
            @PathVariable Long floorId,
            @Valid @RequestBody HouseholdRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Household created successfully.",
                        householdService.createHousehold(
                                floorId,
                                request
                        )
                ));
    }

    // ==========================
    // Get All Households
    // ==========================

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getHouseholdsByFloor(
            @PathVariable Long floorId) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Households fetched successfully.",
                        householdService.getHouseholdsByFloor(
                                floorId
                        )
                )
        );
    }

    // ==========================
    // Get Household By ID
    // ==========================

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/{householdId}")
    public ResponseEntity<ApiResponse<?>> getHouseholdById(
            @PathVariable Long floorId,
            @PathVariable Long householdId) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Household fetched successfully.",
                        householdService.getHouseholdById(
                                floorId,
                                householdId
                        )
                )
        );
    }

    // ==========================
    // Update Household
    // ==========================

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{householdId}")
    public ResponseEntity<ApiResponse<?>> updateHousehold(
            @PathVariable Long floorId,
            @PathVariable Long householdId,
            @Valid @RequestBody HouseholdRequest request) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Household updated successfully.",
                        householdService.updateHousehold(
                                floorId,
                                householdId,
                                request
                        )
                )
        );
    }

    // ==========================
    // Delete Household
    // ==========================

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{householdId}")
    public ResponseEntity<ApiResponse<?>> deleteHousehold(
            @PathVariable Long floorId,
            @PathVariable Long householdId) {

        householdService.deleteHousehold(
                floorId,
                householdId
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Household deleted successfully.",
                        null
                )
        );
    }

}