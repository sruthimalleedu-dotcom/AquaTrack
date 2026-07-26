package com.aquatrack.controller;

import com.aquatrack.dto.dashboard.ManagerDashboardResponseDto;
import com.aquatrack.service.ManagerDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/manager/dashboard")
public class ManagerDashboardController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final ManagerDashboardService managerDashboardService;

    // ==========================================
    // Dashboard Summary
    // ==========================================

    @GetMapping
    public ManagerDashboardResponseDto getDashboard() {

        return managerDashboardService.getDashboard();

    }

}
