package com.aquatrack.service;

import com.aquatrack.dto.dashboard.ResidentDashboardResponse;

public interface DashboardService {

    ResidentDashboardResponse getDashboard(Long householdId);

}