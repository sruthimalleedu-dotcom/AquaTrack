package com.aquatrack.controller;

import com.aquatrack.dto.dashboard.ResidentDashboardResponse;
import com.aquatrack.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/{householdId}")
    public ResidentDashboardResponse getDashboard(
            @PathVariable Long householdId) {

        return dashboardService.getDashboard(householdId);
    }
}