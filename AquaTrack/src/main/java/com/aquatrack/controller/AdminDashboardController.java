package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.admin.DashboardSummaryResponseDto;
import com.aquatrack.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for Super Admin Dashboard.
 *
 * Handles dashboard summary APIs.
 */
@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final AdminDashboardService adminDashboardService;

    // ==========================================
    // Dashboard Summary
    // ==========================================

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardSummaryResponseDto>>
    getDashboardSummary() {

        return ResponseEntity.ok(

                ApiResponse.success(
                        "Dashboard summary fetched successfully.",
                        adminDashboardService.getDashboardSummary()
                )

        );

    }

}
