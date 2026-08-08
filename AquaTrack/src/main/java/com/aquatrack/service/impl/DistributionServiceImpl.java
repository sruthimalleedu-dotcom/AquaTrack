package com.aquatrack.service.impl;

import com.aquatrack.dto.distribution.DistributionItemResponseDto;
import com.aquatrack.dto.distribution.DistributionSummaryResponseDto;
import com.aquatrack.dto.distribution.GenerateDistributionRequestDto;
import com.aquatrack.entity.*;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.*;
import com.aquatrack.service.DistributionService;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DistributionServiceImpl implements DistributionService {

    // ==========================================
    // Repositories
    // ==========================================

    private final BulkWaterPurchaseRepository bulkWaterPurchaseRepository;

    private final WaterUsageLogRepository waterUsageLogRepository;

    private final BuildingRepository buildingRepository;

    private final BillingCycleRepository billingCycleRepository;

    private final UserRepository userRepository;

    private final ManagerBuildingRepository managerBuildingRepository;

    // ==========================================
    // Generate Consumption Distribution
    // ==========================================

    @Override
    public DistributionSummaryResponseDto generateDistribution(
            GenerateDistributionRequestDto request
    ) {

        // ==========================================
        // Request Data
        // ==========================================

        Long buildingId = request.getBuildingId();

        Long billingCycleId = request.getBillingCycleId();

        BigDecimal commonAreaUsage =
                request.getCommonAreaUsage() == null
                        ? BigDecimal.ZERO
                        : request.getCommonAreaUsage();

        // ==========================================
        // Logged-in Manager
        // ==========================================

        String email = SecurityUtil.getCurrentUserEmail();

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Manager not found."
                        )
                );

        // ==========================================
        // Validate Building Access
        // ==========================================

        boolean assigned = managerBuildingRepository
                .existsByManagerIdAndBuildingId(
                        manager.getId(),
                        buildingId
                );

        if (!assigned) {
            throw new ResourceNotFoundException(
                    "You are not assigned to this building."
            );
        }

        // ==========================================
        // Building
        // ==========================================

        Building building = buildingRepository
                .findById(buildingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Building not found."
                        )
                );

        // ==========================================
        // Billing Cycle
        // ==========================================

        BillingCycle billingCycle = billingCycleRepository
                .findById(billingCycleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Billing Cycle not found."
                        )
                );

        // ==========================================
        // Bulk Water Purchase
        // ==========================================

        BulkWaterPurchase bulkWaterPurchase = bulkWaterPurchaseRepository
                .findByBuildingAndBillingCycle(
                        building,
                        billingCycle
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bulk water purchase not found."
                        )
                );

        // ==========================================
        // Water Usage Logs
        // ==========================================

        List<WaterUsageLog> usageLogs =
                waterUsageLogRepository
                        .findByBillingCycleAndHousehold_Floor_BuildingOrderByHousehold_HouseNumberAsc(
                                billingCycle,
                                building
                        );

        if (usageLogs.isEmpty()) {

            throw new ResourceNotFoundException(
                    "No water usage found for this billing cycle."
            );

        }

        // ==========================================
        // Purchase Information
        // ==========================================

        BigDecimal purchasedWater =
                bulkWaterPurchase.getVolumeKL();

        BigDecimal purchaseCost =
                bulkWaterPurchase.getTotalCost();

        BigDecimal costPerKL =
                bulkWaterPurchase.getUnitCost();

        // ==========================================
        // Household Usage
        // ==========================================

        BigDecimal householdUsage = usageLogs.stream()
                .map(WaterUsageLog::getWaterUsage)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (householdUsage.compareTo(BigDecimal.ZERO) <= 0) {

            throw new ResourceNotFoundException(
                    "Total household water usage is zero."
            );

        }

        // ==========================================
// Water Accounting
// ==========================================

// Remaining water in the tank after household and
// common area consumption.
        BigDecimal remainingWater = purchasedWater
                .subtract(householdUsage)
                .subtract(commonAreaUsage);

        if (remainingWater.compareTo(BigDecimal.ZERO) < 0) {

            remainingWater = BigDecimal.ZERO;

        }

// Currently AquaTrack does not have a mechanism to
// measure actual leakage. Therefore, leakage is
// considered zero for now.
//
// In a future milestone, this can be calculated
// using tank level readings or dedicated common
// area water meters.
        BigDecimal waterLoss = BigDecimal.valueOf(0.00);

        // ==========================================
        // Analytics
        // ==========================================

        BigDecimal waterUtilizationPercentage =
                householdUsage
                        .multiply(BigDecimal.valueOf(100))
                        .divide(
                                purchasedWater,
                                2,
                                RoundingMode.HALF_UP
                        );

        BigDecimal recoveryCost =
                householdUsage.multiply(costPerKL)
                        .setScale(2, RoundingMode.HALF_UP);

        // ==========================================
        // Household Distribution
        // ==========================================

        List<DistributionItemResponseDto> households =
                new ArrayList<>();

        for (WaterUsageLog usageLog : usageLogs) {

            Household household = usageLog.getHousehold();

            BigDecimal usageKL = usageLog.getWaterUsage();

            // ==========================================
            // Usage Percentage
            // ==========================================

            BigDecimal usagePercentage = usageKL
                    .multiply(BigDecimal.valueOf(100))
                    .divide(
                            householdUsage,
                            2,
                            RoundingMode.HALF_UP
                    );

            // ==========================================
            // Consumption Cost
            // ==========================================

            BigDecimal consumptionCost = usageKL
                    .multiply(costPerKL)
                    .setScale(2, RoundingMode.HALF_UP);

            // ==========================================
            // Resident Name
            // ==========================================

            String residentName = household.getUsers()
                    .stream()
                    .findFirst()
                    .map(user ->
                            user.getFirstName() + " " + user.getLastName()
                    )
                    .orElse("N/A");

            // ==========================================
            // Add Household Distribution
            // ==========================================

            households.add(

                    DistributionItemResponseDto.builder()

                            .householdId(household.getId())

                            .householdNumber(household.getHouseNumber())

                            .residentName(residentName)

                            .usageKL(usageKL)

                            .usagePercentage(usagePercentage)

                            .costPerKL(costPerKL)

                            .consumptionCost(consumptionCost)

                            .build()

            );

        }

        // ==========================================
        // Return Distribution Summary
        // ==========================================

        return DistributionSummaryResponseDto.builder()

                // ==========================================
                // Building Information
                // ==========================================

                .buildingId(building.getId())

                .buildingName(building.getBuildingName())

                .billingCycleId(billingCycle.getId())

                .billingCycleName(billingCycle.getCycleName())

                // ==========================================
                // Purchase Information
                // ==========================================

                .purchasedWaterKL(purchasedWater)

                .purchaseCost(purchaseCost)

                .costPerKL(costPerKL)

                // ==========================================
                // Usage Summary
                // ==========================================

                .householdUsageKL(householdUsage)

                .commonAreaUsageKL(commonAreaUsage)

                .waterLossKL(waterLoss)

                .remainingWaterKL(remainingWater)

                // ==========================================
                // Analytics
                // ==========================================

                .waterUtilizationPercentage(
                        waterUtilizationPercentage
                )

                .recoveryCost(recoveryCost)

                // ==========================================
                // Household Distribution
                // ==========================================

                .households(households)

                .build();

    }

}