package com.aquatrack.service.impl;

import com.aquatrack.dto.bills.GenerateBillsRequestDto;
import com.aquatrack.dto.bills.UpdateBillStatusRequestDto;
import com.aquatrack.dto.bills.WaterBillResponseDto;
import com.aquatrack.dto.bills.WaterBillSummaryResponseDto;
import com.aquatrack.repository.*;
import com.aquatrack.service.DistributionService;
import com.aquatrack.service.WaterBillService;
import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.User;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.dto.distribution.DistributionSummaryResponseDto;
import com.aquatrack.dto.distribution.GenerateDistributionRequestDto;
import com.aquatrack.dto.distribution.DistributionItemResponseDto;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.WaterBill;
import com.aquatrack.enums.BillStatus;
import java.time.LocalDate;
import java.math.RoundingMode;
import java.math.BigDecimal;
import com.aquatrack.pdf.InvoicePdfService;
import org.springframework.core.io.Resource;

import java.util.ArrayList;
import java.util.List;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WaterBillServiceImpl implements WaterBillService {

    // ==========================================
    // Services
    // ==========================================

    private final DistributionService distributionService;

    private final InvoicePdfService invoicePdfService;

    // ==========================================
    // Repositories
    // ==========================================

    private final WaterBillRepository waterBillRepository;

    private final HouseholdRepository householdRepository;

    private final BillingCycleRepository billingCycleRepository;

    private final BuildingRepository buildingRepository;

    private final UserRepository userRepository;

    private final ManagerBuildingRepository managerBuildingRepository;

    // ==========================================
    // Generate Bills
    // ==========================================

    @Override
    public WaterBillSummaryResponseDto generateBills(
            GenerateBillsRequestDto request
    ) {

        // ==========================================
        // Request Data
        // ==========================================

        Long buildingId = request.getBuildingId();

        Long billingCycleId = request.getBillingCycleId();

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
        // Generate Consumption Distribution
        // ==========================================

        DistributionSummaryResponseDto distribution =
                distributionService.generateDistribution(

                        GenerateDistributionRequestDto.builder()

                                .buildingId(buildingId)

                                .billingCycleId(billingCycleId)

                                .commonAreaUsage(
                                        request.getCommonAreaUsage()
                                )

                                .build()

                );

        // ==========================================
        // Generate Water Bills
        // ==========================================

        List<WaterBill> waterBills = new ArrayList<>();

        for (DistributionItemResponseDto item : distribution.getHouseholds()) {

            // ==========================================
            // Household
            // ==========================================

            Household household = householdRepository
                    .findById(item.getHouseholdId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Household not found."
                            )
                    );

            // ==========================================
            // Tariff Charge
            // ==========================================

            BigDecimal tariffCharge =
                    calculateTariffCharge(
                            item.getUsageKL()
                    );

            // ==========================================
            // Total Bill Amount
            // ==========================================

            BigDecimal totalAmount =
                    tariffCharge
                            .add(item.getConsumptionCost())
                            .setScale(2, RoundingMode.HALF_UP);

            // ==========================================
            // Create Water Bill
            // ==========================================

            WaterBill waterBill = WaterBill.builder()

                    .household(household)

                    .billingCycle(billingCycle)

                    // ==========================================
                    // Consumption Snapshot
                    // ==========================================

                    .consumptionKL(item.getUsageKL())

                    .usagePercentage(item.getUsagePercentage())

                    // ==========================================
                    // Billing Snapshot
                    // ==========================================

                    .costPerKL(item.getCostPerKL())

                    .sharedWaterCost(item.getConsumptionCost())

                    .tariffCharge(tariffCharge)

                    .adjustmentAmount(BigDecimal.ZERO)

                    .totalAmount(totalAmount)

                    // ==========================================
                    // Invoice Information
                    // ==========================================

                    .invoiceNumber(
                            generateInvoiceNumber(
                                    household,
                                    billingCycle
                            )
                    )

                    .generatedDate(LocalDate.now())

                    .dueDate(billingCycle.getDueDate())

                    // ==========================================
                    // Bill Status
                    // ==========================================

                    .billStatus(BillStatus.PENDING)

                    .build();

            // ==========================================
            // Add To List
            // ==========================================

            waterBills.add(waterBill);

        }

        // ==========================================
        // Save Water Bills
        // ==========================================

        waterBillRepository.saveAll(waterBills);

        return WaterBillSummaryResponseDto.builder()

                // ==========================================
                // Building Information
                // ==========================================

                .buildingId(building.getId())

                .buildingName(building.getBuildingName())

                // ==========================================
                // Billing Cycle
                // ==========================================

                .billingCycleId(billingCycle.getId())

                .billingCycleName(billingCycle.getCycleName())

                // ==========================================
                // Summary
                // ==========================================

                .totalBills(waterBills.size())

                .paidBills(0)

                .pendingBills(waterBills.size())

                .overdueBills(0)

                .totalConsumptionKL(
                        distribution.getHouseholdUsageKL()
                )

                .totalBillAmount(
                        waterBills.stream()
                                .map(WaterBill::getTotalAmount)
                                .reduce(BigDecimal.ZERO, BigDecimal::add)
                )

                // ==========================================
                // Bills
                // ==========================================

                .bills(new ArrayList<>())

                .build();

    }

    // ==========================================
    // Get Bills
    // ==========================================

    @Override
    public WaterBillSummaryResponseDto getBills(
            Long buildingId,
            Long billingCycleId
    ) {

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
        // Fetch Water Bills
        // ==========================================

        List<WaterBill> waterBills = waterBillRepository
                .findByBillingCycle(billingCycle);

        // ==========================================
        // Filter Bills By Building
        // ==========================================

        List<WaterBill> filteredBills = waterBills.stream()

                .filter(bill ->
                        bill.getHousehold()
                                .getFloor()
                                .getBuilding()
                                .getId()
                                .equals(buildingId)
                )

                .toList();

        // ==========================================
// Convert To Response DTO
// ==========================================

        List<WaterBillResponseDto> billResponses = filteredBills.stream()

                .map(bill -> WaterBillResponseDto.builder()

                        // ==========================================
                        // Bill Information
                        // ==========================================

                        .billId(bill.getId())

                        .invoiceNumber(bill.getInvoiceNumber())

                        .billStatus(bill.getBillStatus())

                        // ==========================================
                        // Household Information
                        // ==========================================

                        .householdId(
                                bill.getHousehold().getId()
                        )

                        .householdNumber(
                                bill.getHousehold().getHouseNumber()
                        )

                        .residentName(
                                bill.getHousehold()
                                        .getUsers()
                                        .stream()
                                        .findFirst()
                                        .map(user -> user.getFirstName()
                                                + (user.getLastName() != null
                                                ? " " + user.getLastName()
                                                : ""))
                                        .orElse("N/A")
                        )

                        // ==========================================
                        // Billing Cycle
                        // ==========================================

                        .billingCycleId(
                                bill.getBillingCycle().getId()
                        )

                        .billingCycleName(
                                bill.getBillingCycle().getCycleName()
                        )

                        // ==========================================
                        // Consumption
                        // ==========================================

                        .consumptionKL(
                                bill.getConsumptionKL()
                        )

                        .usagePercentage(
                                bill.getUsagePercentage()
                        )

                        // ==========================================
                        // Billing Details
                        // ==========================================

                        .costPerKL(
                                bill.getCostPerKL()
                        )

                        .sharedWaterCost(
                                bill.getSharedWaterCost()
                        )

                        .tariffCharge(
                                bill.getTariffCharge()
                        )

                        .adjustmentAmount(
                                bill.getAdjustmentAmount()
                        )

                        .totalAmount(
                                bill.getTotalAmount()
                        )

                        // ==========================================
                        // Dates
                        // ==========================================

                        .generatedDate(
                                bill.getGeneratedDate()
                        )

                        .dueDate(
                                bill.getDueDate()
                        )

                        .build()

                )

                .toList();

        return WaterBillSummaryResponseDto.builder()

                // ==========================================
                // Building Information
                // ==========================================

                .buildingId(building.getId())

                .buildingName(building.getBuildingName())

                // ==========================================
                // Billing Cycle
                // ==========================================

                .billingCycleId(billingCycle.getId())

                .billingCycleName(billingCycle.getCycleName())

                // ==========================================
                // Summary
                // ==========================================

                .totalBills(filteredBills.size())

                .paidBills(
                        (int) filteredBills.stream()
                                .filter(bill -> bill.getBillStatus() == BillStatus.PAID)
                                .count()
                )

                .pendingBills(
                        (int) filteredBills.stream()
                                .filter(bill -> bill.getBillStatus() == BillStatus.PENDING)
                                .count()
                )

                .overdueBills(
                        (int) filteredBills.stream()
                                .filter(bill -> bill.getBillStatus() == BillStatus.OVERDUE)
                                .count()
                )

                .totalConsumptionKL(
                        filteredBills.stream()
                                .map(WaterBill::getConsumptionKL)
                                .reduce(BigDecimal.ZERO, BigDecimal::add)
                )

                .totalBillAmount(
                        filteredBills.stream()
                                .map(WaterBill::getTotalAmount)
                                .reduce(BigDecimal.ZERO, BigDecimal::add)
                )

                // ==========================================
                // Bills
                // ==========================================

                .bills(billResponses)

                .build();

    }

    // ==========================================
    // Get Bill By Id
    // ==========================================

    @Override
    public WaterBillResponseDto getBillById(
            Long billId
    ) {

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
        // Water Bill
        // ==========================================

        WaterBill waterBill = waterBillRepository
                .findById(billId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Water Bill not found."
                        )
                );

        // ==========================================
        // Building Access Validation
        // ==========================================

        Long buildingId = waterBill.getHousehold()
                .getFloor()
                .getBuilding()
                .getId();

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

        return WaterBillResponseDto.builder()

                // ==========================================
                // Bill Information
                // ==========================================

                .billId(waterBill.getId())

                .invoiceNumber(waterBill.getInvoiceNumber())

                .billStatus(waterBill.getBillStatus())

                // ==========================================
                // Household Information
                // ==========================================

                .householdId(
                        waterBill.getHousehold().getId()
                )

                .householdNumber(
                        waterBill.getHousehold().getHouseNumber()
                )

                .residentName(
                        waterBill.getHousehold()
                                .getUsers()
                                .stream()
                                .findFirst()
                                .map(user -> user.getFirstName()
                                        + (user.getLastName() != null
                                        ? " " + user.getLastName()
                                        : ""))
                                .orElse("N/A")
                )

                // ==========================================
                // Billing Cycle
                // ==========================================

                .billingCycleId(
                        waterBill.getBillingCycle().getId()
                )

                .billingCycleName(
                        waterBill.getBillingCycle().getCycleName()
                )

                // ==========================================
                // Consumption
                // ==========================================

                .consumptionKL(
                        waterBill.getConsumptionKL()
                )

                .usagePercentage(
                        waterBill.getUsagePercentage()
                )

                // ==========================================
                // Billing Details
                // ==========================================

                .costPerKL(
                        waterBill.getCostPerKL()
                )

                .sharedWaterCost(
                        waterBill.getSharedWaterCost()
                )

                .tariffCharge(
                        waterBill.getTariffCharge()
                )

                .adjustmentAmount(
                        waterBill.getAdjustmentAmount()
                )

                .totalAmount(
                        waterBill.getTotalAmount()
                )

                // ==========================================
                // Dates
                // ==========================================

                .generatedDate(
                        waterBill.getGeneratedDate()
                )

                .dueDate(
                        waterBill.getDueDate()
                )

                .build();

    }

    // ==========================================
    // Update Bill Status
    // ==========================================

    @Override
    public WaterBillResponseDto updateBillStatus(
            Long billId,
            UpdateBillStatusRequestDto request
    ) {

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
        // Water Bill
        // ==========================================

        WaterBill waterBill = waterBillRepository
                .findById(billId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Water Bill not found."
                        )
                );

        // ==========================================
        // Validate Building Access
        // ==========================================

        Long buildingId = waterBill.getHousehold()
                .getFloor()
                .getBuilding()
                .getId();

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
        // Update Bill Status
        // ==========================================

        waterBill.setBillStatus(
                request.getBillStatus()
        );

        // ==========================================
        // Save
        // ==========================================

        waterBill = waterBillRepository.save(
                waterBill
        );

        return WaterBillResponseDto.builder()

                // ==========================================
                // Bill Information
                // ==========================================

                .billId(waterBill.getId())

                .invoiceNumber(waterBill.getInvoiceNumber())

                .billStatus(waterBill.getBillStatus())

                // ==========================================
                // Household Information
                // ==========================================

                .householdId(
                        waterBill.getHousehold().getId()
                )

                .householdNumber(
                        waterBill.getHousehold().getHouseNumber()
                )

                .residentName(
                        waterBill.getHousehold()
                                .getUsers()
                                .stream()
                                .findFirst()
                                .map(user -> user.getFirstName()
                                        + (user.getLastName() != null
                                        ? " " + user.getLastName()
                                        : ""))
                                .orElse("N/A")
                )

                // ==========================================
                // Billing Cycle
                // ==========================================

                .billingCycleId(
                        waterBill.getBillingCycle().getId()
                )

                .billingCycleName(
                        waterBill.getBillingCycle().getCycleName()
                )

                // ==========================================
                // Consumption
                // ==========================================

                .consumptionKL(
                        waterBill.getConsumptionKL()
                )

                .usagePercentage(
                        waterBill.getUsagePercentage()
                )

                // ==========================================
                // Billing Details
                // ==========================================

                .costPerKL(
                        waterBill.getCostPerKL()
                )

                .sharedWaterCost(
                        waterBill.getSharedWaterCost()
                )

                .tariffCharge(
                        waterBill.getTariffCharge()
                )

                .adjustmentAmount(
                        waterBill.getAdjustmentAmount()
                )

                .totalAmount(
                        waterBill.getTotalAmount()
                )

                // ==========================================
                // Dates
                // ==========================================

                .generatedDate(
                        waterBill.getGeneratedDate()
                )

                .dueDate(
                        waterBill.getDueDate()
                )

                .build();

    }

    // ==========================================
// Download Invoice
// ==========================================

    @Override
    public Resource downloadInvoice(
            Long billId
    ) {

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
        // Water Bill
        // ==========================================

        WaterBill waterBill = waterBillRepository
                .findById(billId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Water Bill not found."
                        )
                );

        // ==========================================
        // Validate Building Access
        // ==========================================

        Long buildingId = waterBill.getHousehold()
                .getFloor()
                .getBuilding()
                .getId();

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
        // Generate Invoice PDF
        // ==========================================

        return invoicePdfService.generateInvoice(
                waterBill
        );

    }

    // ==========================================
    // Calculate Tiered Tariff
    // ==========================================

    private BigDecimal calculateTariffCharge(
            BigDecimal consumptionKL
    ) {

        if (consumptionKL.compareTo(BigDecimal.valueOf(10)) <= 0) {

            return consumptionKL.multiply(
                    BigDecimal.valueOf(5)
            );

        }

        if (consumptionKL.compareTo(BigDecimal.valueOf(20)) <= 0) {

            BigDecimal firstSlab = BigDecimal.valueOf(10)
                    .multiply(BigDecimal.valueOf(5));

            BigDecimal secondSlab = consumptionKL
                    .subtract(BigDecimal.valueOf(10))
                    .multiply(BigDecimal.valueOf(8));

            return firstSlab.add(secondSlab);

        }

        BigDecimal firstSlab = BigDecimal.valueOf(10)
                .multiply(BigDecimal.valueOf(5));

        BigDecimal secondSlab = BigDecimal.valueOf(10)
                .multiply(BigDecimal.valueOf(8));

        BigDecimal thirdSlab = consumptionKL
                .subtract(BigDecimal.valueOf(20))
                .multiply(BigDecimal.valueOf(12));

        return firstSlab
                .add(secondSlab)
                .add(thirdSlab);

    }


    // ==========================================
    // Generate Invoice Number
    // ==========================================

    private String generateInvoiceNumber(
            Household household,
            BillingCycle billingCycle
    ) {

        return "WB-"
                + billingCycle.getId()
                + "-"
                + household.getId()
                + "-"
                + System.currentTimeMillis();

    }

}