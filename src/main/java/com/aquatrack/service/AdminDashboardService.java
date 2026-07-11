package com.aquatrack.service;

import com.aquatrack.dto.admin.DashboardSummaryResponseDto;

/**
 * Service Interface for Super Admin Dashboard.
 *
 * Provides dashboard statistics and summary.
 */
public interface AdminDashboardService {

    /**
     * Fetch dashboard summary.
     *
     * @return dashboard summary response
     */
    DashboardSummaryResponseDto getDashboardSummary();

}