package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.service.HouseholdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Manager Household Dashboard.
 *
 * Returns all households assigned to the logged-in manager.
 */
@RestController
@RequestMapping("/api/manager/households")
@RequiredArgsConstructor
public class ManagerHouseholdController {

    private final HouseholdService householdService;

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getManagerHouseholds() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Manager households fetched successfully.",
                        householdService.getManagerHouseholds()
                )
        );

    }

}