package com.aquatrack.service.impl;

import com.aquatrack.dto.distribution.DistributionResponseDto;
import com.aquatrack.entity.*;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.*;
import com.aquatrack.util.SecurityUtil;
import com.aquatrack.service.DistributionService;
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
    // Consumption Distribution
    // ==========================================

    @Override
    public List<DistributionResponseDto> getConsumptionDistribution(
            Long buildingId,
            Long billingCycleId
    ) {

        // ==========================================
        // Logged-in Manager
        // ==========================================

        String email = SecurityUtil.getCurrentUserEmail();

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Manager not found.")
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
        // Total Building Usage
        // ==========================================

        BigDecimal totalUsage = usageLogs.stream()
                .map(WaterUsageLog::getWaterUsage)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalUsage.compareTo(BigDecimal.ZERO) == 0) {
            throw new ResourceNotFoundException(
                    "Total water usage is zero."
            );
        }

        // ==========================================
        // Total Purchase Cost
        // ==========================================

        BigDecimal totalPurchaseCost =
                bulkWaterPurchase.getTotalCost();

        List<DistributionResponseDto> response =
                new ArrayList<>();

        // ==========================================
        // Calculate Distribution
        // ==========================================

        for (WaterUsageLog usageLog : usageLogs) {

            Household household = usageLog.getHousehold();

            BigDecimal householdUsage = usageLog.getWaterUsage();

            // Usage Percentage
            BigDecimal usagePercentage = householdUsage
                    .multiply(BigDecimal.valueOf(100))
                    .divide(totalUsage, 2, RoundingMode.HALF_UP);

            // Charge Amount
            BigDecimal chargeAmount = householdUsage
                    .multiply(totalPurchaseCost)
                    .divide(totalUsage, 2, RoundingMode.HALF_UP);

            // Resident Name
            String residentName = household.getUsers()
                    .stream()
                    .findFirst()
                    .map(user -> user.getFirstName() + " " + user.getLastName())
                    .orElse("N/A");

            response.add(

                    DistributionResponseDto.builder()

                            .householdId(household.getId())

                            .householdNumber(household.getHouseNumber())

                            .residentName(residentName)

                            .usageKL(householdUsage)

                            .usagePercentage(usagePercentage)

                            .chargeAmount(chargeAmount)

                            .build()

            );

        }

        return response;

    }

}
