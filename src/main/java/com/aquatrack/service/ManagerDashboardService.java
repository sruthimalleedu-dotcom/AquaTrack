package com.aquatrack.service;

import com.aquatrack.dto.dashboard.ManagerDashboardResponseDto;

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

}
