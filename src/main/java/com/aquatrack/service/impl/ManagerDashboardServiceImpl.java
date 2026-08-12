package com.aquatrack.service.impl;

import com.aquatrack.dto.dashboard.ManagerDashboardResponseDto;
import com.aquatrack.dto.dashboard.MonthlyWaterConsumptionDto;
import com.aquatrack.dto.dashboard.BuildingUsageDto;
import com.aquatrack.dto.dashboard.PaymentStatusChartDto;
import com.aquatrack.dto.dashboard.BillStatusChartDto;
import com.aquatrack.dto.dashboard.TopConsumerDto;
import com.aquatrack.dto.dashboard.RevenueTrendDto;
import com.aquatrack.dto.dashboard.RecentBillDto;
import com.aquatrack.dto.dashboard.RecentPaymentDto;
import com.aquatrack.dto.dashboard.DashboardAlertDto;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.ManagerBuilding;
import com.aquatrack.entity.User;
import com.aquatrack.enums.BillStatus;
import com.aquatrack.enums.PaymentStatus;
import com.aquatrack.enums.PaymentMethod;
import com.aquatrack.enums.HouseholdStatus;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.HouseholdRepository;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.repository.WaterBillRepository;
import com.aquatrack.repository.WaterUsageLogRepository;
import com.aquatrack.repository.PaymentRepository;
import com.aquatrack.service.ManagerDashboardService;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    private final WaterUsageLogRepository waterUsageLogRepository;

    private final WaterBillRepository waterBillRepository;

    private final PaymentRepository paymentRepository;

    // ==========================================
    // Manager Dashboard
    // ==========================================

    @Override
    public ManagerDashboardResponseDto getDashboard() {

        User manager = getCurrentManager();

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .toList();

        // ==========================================
        // Dashboard Summary
        // ==========================================

        long totalBuildings = buildings.size();

        long totalHouseholds =
                householdRepository.countByFloor_BuildingIn(buildings);

        long occupiedHouseholds =
                householdRepository.countByFloor_BuildingInAndStatus(
                        buildings,
                        HouseholdStatus.OCCUPIED
                );

        long vacantHouseholds =
                householdRepository.countByFloor_BuildingInAndStatus(
                        buildings,
                        HouseholdStatus.VACANT
                );

        long totalResidents =
                userRepository.countByRoleAndHousehold_Floor_BuildingIn(
                        UserRole.RESIDENT,
                        buildings
                );

        BigDecimal totalWaterConsumption =
                waterUsageLogRepository.getTotalWaterConsumption(buildings);

        long totalBills =
                waterBillRepository.countByHousehold_Floor_BuildingIn(
                        buildings
                );

        long paidBills =
                waterBillRepository
                        .countByHousehold_Floor_BuildingInAndBillStatus(
                                buildings,
                                BillStatus.PAID
                        );

        long pendingBills = totalBills - paidBills;

        BigDecimal pendingAmount =
                waterBillRepository.getPendingAmount(
                        buildings,
                        BillStatus.PENDING
                );

        // Payment module is not implemented yet
        BigDecimal totalRevenueCollected = BigDecimal.ZERO;

        return ManagerDashboardResponseDto.builder()
                .totalBuildings(totalBuildings)
                .totalHouseholds(totalHouseholds)
                .occupiedHouseholds(occupiedHouseholds)
                .vacantHouseholds(vacantHouseholds)
                .totalResidents(totalResidents)
                .totalWaterConsumption(totalWaterConsumption)
                .totalBills(totalBills)
                .paidBills(paidBills)
                .pendingBills(pendingBills)
                .pendingAmount(pendingAmount)
                .totalRevenueCollected(totalRevenueCollected)
                .build();
    }

    @Override
    public List<MonthlyWaterConsumptionDto> getMonthlyWaterConsumption() {

        User manager = getCurrentManager();

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .toList();

        return waterUsageLogRepository
                .getMonthlyWaterConsumption(buildings)
                .stream()
                .map(row -> MonthlyWaterConsumptionDto.builder()
                        .month((String) row[0])
                        .totalConsumption((BigDecimal) row[1])
                        .build())
                .toList();

    }

    @Override
    public List<BuildingUsageDto> getBuildingUsage() {

        User manager = getCurrentManager();

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .toList();

        return waterUsageLogRepository
                .getBuildingUsage(buildings)
                .stream()
                .map(row -> BuildingUsageDto.builder()
                        .buildingName((String) row[0])
                        .totalConsumption((BigDecimal) row[1])
                        .build())
                .toList();

    }

    @Override
    public PaymentStatusChartDto getPaymentStatus() {

        User manager = getCurrentManager();

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .toList();

        long paidBills =
                waterBillRepository.countByHousehold_Floor_BuildingInAndBillStatus(
                        buildings,
                        BillStatus.PAID
                );

        long totalBills =
                waterBillRepository.countByHousehold_Floor_BuildingIn(
                        buildings
                );

        long pendingBills = totalBills - paidBills;

        return PaymentStatusChartDto.builder()
                .paidBills(paidBills)
                .pendingBills(pendingBills)
                .build();

    }

    @Override
    public BillStatusChartDto getBillStatus() {

        User manager = getCurrentManager();

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .toList();

        long paid =
                waterBillRepository
                        .countByHousehold_Floor_BuildingInAndBillStatus(
                                buildings,
                                BillStatus.PAID
                        );

        long pending =
                waterBillRepository
                        .countByHousehold_Floor_BuildingInAndBillStatus(
                                buildings,
                                BillStatus.PENDING
                        );

        long overdue =
                waterBillRepository
                        .countByHousehold_Floor_BuildingInAndBillStatus(
                                buildings,
                                BillStatus.OVERDUE
                        );

        return BillStatusChartDto.builder()
                .paid(paid)
                .pending(pending)
                .overdue(overdue)
                .build();

    }

    @Override
    public List<RevenueTrendDto> getRevenueTrend() {

        User manager = getCurrentManager();

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .toList();

        return paymentRepository
                .getMonthlyRevenueTrend(
                        buildings,
                        PaymentStatus.SUCCESS
                )
                .stream()
                .map(row -> RevenueTrendDto.builder()
                        .month((String) row[0])
                        .revenue((BigDecimal) row[1])
                        .build())
                .toList();

    }
    @Override
    public List<TopConsumerDto> getTopConsumers() {

        User manager = getCurrentManager();

        List<Building> buildings =
                managerBuildingRepository
                        .findByManager(manager)
                        .stream()
                        .map(ManagerBuilding::getBuilding)
                        .toList();

        return waterUsageLogRepository
                .getTopConsumers(buildings)
                .stream()
                .limit(10)
                .map(row -> TopConsumerDto.builder()
                        .houseNumber((String) row[0])
                        .buildingName((String) row[1])
                        .totalConsumption((BigDecimal) row[2])
                        .build())
                .toList();

    }

    @Override
    public List<RecentBillDto> getRecentBills() {

        User manager = getCurrentManager();

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .toList();

        return waterBillRepository
                .getRecentBills(buildings)
                .stream()
                .limit(10)
                .map(row -> RecentBillDto.builder()
                        .invoiceNumber((String) row[0])
                        .houseNumber((String) row[1])
                        .buildingName((String) row[2])
                        .totalAmount((BigDecimal) row[3])
                        .dueDate((LocalDate) row[4])
                        .billStatus((BillStatus) row[5])
                        .build())
                .toList();

    }

    @Override
    public List<RecentPaymentDto> getRecentPayments() {

        User manager = getCurrentManager();

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .toList();

        return paymentRepository
                .getRecentPayments(buildings)
                .stream()
                .limit(10)
                .map(row -> RecentPaymentDto.builder()
                        .transactionId((String) row[0])
                        .invoiceNumber((String) row[1])
                        .houseNumber((String) row[2])
                        .residentName((String) row[3])
                        .paymentMethod((PaymentMethod) row[4])
                        .amount((BigDecimal) row[5])
                        .paymentStatus((PaymentStatus) row[6])
                        .paymentDate((LocalDateTime) row[7])
                        .build())
                .toList();

    }

    @Override
    public List<DashboardAlertDto> getAlerts() {

        User manager = getCurrentManager();

        List<Building> buildings =
                managerBuildingRepository
                        .findByManager(manager)
                        .stream()
                        .map(ManagerBuilding::getBuilding)
                        .toList();

        List<DashboardAlertDto> alerts = new ArrayList<>();

        long pendingBills =
                waterBillRepository
                        .countByHousehold_Floor_BuildingInAndBillStatus(
                                buildings,
                                BillStatus.PENDING
                        );

        if (pendingBills > 0) {

            alerts.add(
                    DashboardAlertDto.builder()
                            .title("Pending Bills")
                            .message(
                                    pendingBills +
                                            " bills are pending payment."
                            )
                            .severity("WARNING")
                            .build()
            );

        }

        long overdueBills =
                waterBillRepository
                        .countByHousehold_Floor_BuildingInAndBillStatus(
                                buildings,
                                BillStatus.OVERDUE
                        );

        if (overdueBills > 0) {

            alerts.add(
                    DashboardAlertDto.builder()
                            .title("Overdue Bills")
                            .message(
                                    overdueBills +
                                            " bills are overdue."
                            )
                            .severity("CRITICAL")
                            .build()
            );

        }

        if (alerts.isEmpty()) {

            alerts.add(
                    DashboardAlertDto.builder()
                            .title("System Healthy")
                            .message("No active alerts.")
                            .severity("INFO")
                            .build()
            );

        }

        return alerts;

    }

    // ==========================================
    // Helper Methods
    // ==========================================

    /**
     * Returns the currently logged-in manager.
     *
     * @return logged-in manager
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