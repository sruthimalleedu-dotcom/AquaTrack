package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.dashboard.PropertyAdminDashboardSummaryResponse;
import com.aquatrack.service.PropertyAdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/property-admin/dashboard")
@RequiredArgsConstructor
public class PropertyAdminDashboardController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PropertyAdminDashboardService propertyAdminDashboardService;

    // ==========================================
    // Dashboard Summary
    // ==========================================

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<PropertyAdminDashboardSummaryResponse>>
    getDashboardSummary() {

        PropertyAdminDashboardSummaryResponse response =
                propertyAdminDashboardService.getDashboardSummary();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Dashboard summary fetched successfully.",
                        response
                )
        );

    }

}