package com.aquatrack.service;

import com.aquatrack.dto.dashboard.ManagerDashboardResponseDto;
import com.aquatrack.dto.dashboard.MonthlyWaterConsumptionDto;
import com.aquatrack.dto.dashboard.BuildingUsageDto;
import com.aquatrack.dto.dashboard.PaymentStatusChartDto;
import com.aquatrack.dto.dashboard.BillStatusChartDto;
import com.aquatrack.dto.dashboard.RevenueTrendDto;
import com.aquatrack.dto.dashboard.TopConsumerDto;
import com.aquatrack.dto.dashboard.RecentBillDto;
import com.aquatrack.dto.dashboard.RecentPaymentDto;
import com.aquatrack.dto.dashboard.DashboardAlertDto;
import java.util.List;
/**
 * Service for Manager Dashboard.
 */
public interface ManagerDashboardService {

    /**
     * Returns dashboard summary of the
     * logged-in manager.
     *
     * @return Manager dashboard summary
     */
    ManagerDashboardResponseDto getDashboard();

    List<MonthlyWaterConsumptionDto> getMonthlyWaterConsumption();

    List<BuildingUsageDto> getBuildingUsage();

    PaymentStatusChartDto getPaymentStatus();

    BillStatusChartDto getBillStatus();

    List<RevenueTrendDto> getRevenueTrend();

    List<TopConsumerDto> getTopConsumers();

    List<RecentBillDto> getRecentBills();

    List<RecentPaymentDto> getRecentPayments();

    List<DashboardAlertDto> getAlerts();

}
