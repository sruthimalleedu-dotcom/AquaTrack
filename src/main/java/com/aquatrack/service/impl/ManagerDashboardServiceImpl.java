package com.aquatrack.service.impl;

import com.aquatrack.dto.dashboard.ManagerDashboardResponseDto;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.ManagerBuilding;
import com.aquatrack.entity.User;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.HouseholdRepository;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.ManagerDashboardService;
import com.aquatrack.util.SecurityUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ManagerDashboardServiceImpl
        implements ManagerDashboardService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final UserRepository userRepository;

    private final HouseholdRepository householdRepository;

    private final ManagerBuildingRepository managerBuildingRepository;

    // ==========================================
// Manager Dashboard
// ==========================================

    @Override
    public ManagerDashboardResponseDto getDashboard() {

        User manager = getCurrentManager();

        List<Building> buildings =
                managerBuildingRepository
                        .findByManager(manager)
                        .stream()
                        .map(ManagerBuilding::getBuilding)
                        .toList();

        long totalHouseholds =
                householdRepository
                        .countByFloor_BuildingIn(buildings);

        long totalResidents =
                userRepository
                        .countByRoleAndHousehold_Floor_BuildingIn(
                                UserRole.RESIDENT,
                                buildings
                        );

        return ManagerDashboardResponseDto.builder()
                .totalHouseholds(totalHouseholds)
                .totalResidents(totalResidents)
                .build();

    }

    // ==========================================
// Helper Methods
// ==========================================

    /**
     * Returns the currently logged-in manager.
     *
     * @return Logged-in manager
     */
    private User getCurrentManager() {

        String email = SecurityUtil.getCurrentUserEmail();

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Logged-in manager not found."
                        )
                );

        if (manager.getRole() != UserRole.MANAGER) {

            throw new AccessDeniedException(
                    "Only managers can access the dashboard."
            );

        }

        return manager;

    }

}