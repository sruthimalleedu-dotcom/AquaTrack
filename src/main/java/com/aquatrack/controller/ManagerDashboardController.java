package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.dashboard.BillStatusChartDto;
import com.aquatrack.dto.dashboard.BuildingUsageDto;
import com.aquatrack.dto.dashboard.DashboardAlertDto;
import com.aquatrack.dto.dashboard.ManagerDashboardResponseDto;
//import com.aquatrack.dto.dashboard.MonthlyConsumptionDto;
import com.aquatrack.dto.dashboard.MonthlyWaterConsumptionDto;
import com.aquatrack.dto.dashboard.PaymentStatusChartDto;
import com.aquatrack.dto.dashboard.RecentBillDto;
import com.aquatrack.dto.dashboard.RecentPaymentDto;
import com.aquatrack.dto.dashboard.RevenueTrendDto;
import com.aquatrack.dto.dashboard.TopConsumerDto;
import com.aquatrack.service.ManagerDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/manager/dashboard")
@PreAuthorize("hasRole('MANAGER')")
public class ManagerDashboardController {

    private final ManagerDashboardService managerDashboardService;

    @GetMapping("/summary")
    public ApiResponse<ManagerDashboardResponseDto> getDashboardSummary() {

        return ApiResponse.success(
                "Dashboard summary retrieved successfully.",
                managerDashboardService.getDashboard()
        );
    }

    @GetMapping("/water-consumption")
    public ApiResponse<List<MonthlyWaterConsumptionDto>> getMonthlyWaterConsumption() {

        return ApiResponse.success(
                "Monthly water consumption retrieved successfully.",
                managerDashboardService.getMonthlyWaterConsumption()
        );
    }

    @GetMapping("/building-usage")
    public ApiResponse<List<BuildingUsageDto>> getBuildingUsage() {

        return ApiResponse.success(
                "Building usage retrieved successfully.",
                managerDashboardService.getBuildingUsage()
        );

    }

    @GetMapping("/payment-status")
    public ApiResponse<PaymentStatusChartDto> getPaymentStatus() {

        return ApiResponse.success(
                "Payment status retrieved successfully.",
                managerDashboardService.getPaymentStatus()
        );

    }

    @GetMapping("/bill-status")
    public ApiResponse<BillStatusChartDto> getBillStatus() {

        return ApiResponse.success(
                "Bill status retrieved successfully.",
                managerDashboardService.getBillStatus()
        );

    }

    @GetMapping("/revenue-trend")
    public ApiResponse<List<RevenueTrendDto>> getRevenueTrend() {

        return ApiResponse.success(
                "Revenue trend retrieved successfully.",
                managerDashboardService.getRevenueTrend()
        );

    }

    @GetMapping("/top-consumers")
    public ApiResponse<List<TopConsumerDto>> getTopConsumers() {

        return ApiResponse.success(
                "Top consumers retrieved successfully.",
                managerDashboardService.getTopConsumers()
        );

    }

    @GetMapping("/recent-bills")
    public ApiResponse<List<RecentBillDto>> getRecentBills() {

        return ApiResponse.success(
                "Recent bills retrieved successfully.",
                managerDashboardService.getRecentBills()
        );

    }

    @GetMapping("/recent-payments")
    public ApiResponse<List<RecentPaymentDto>> getRecentPayments() {

        return ApiResponse.success(
                "Recent payments retrieved successfully.",
                managerDashboardService.getRecentPayments()
        );

    }

    @GetMapping("/alerts")
    public ApiResponse<List<DashboardAlertDto>> getAlerts() {

        return ApiResponse.success(
                "Dashboard alerts retrieved successfully.",
                managerDashboardService.getAlerts()
        );

    }
}