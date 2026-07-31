package com.aquatrack.service.impl;

import com.aquatrack.dto.resident.ResidentWaterBillResponseDto;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.User;
import com.aquatrack.entity.WaterBill;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.repository.WaterBillRepository;
import com.aquatrack.service.ResidentWaterBillService;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResidentWaterBillServiceImpl implements ResidentWaterBillService {

    // ==========================================
    // Repositories
    // ==========================================

    private final UserRepository userRepository;

    private final WaterBillRepository waterBillRepository;

    // ==========================================
    // Get My Water Bills
    // ==========================================

    @Override
    public List<ResidentWaterBillResponseDto> getMyWaterBills() {

        // ==========================================
        // Logged-in Resident
        // ==========================================

        String email = SecurityUtil.getCurrentUserEmail();

        User resident = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resident not found."
                        )
                );

        // ==========================================
        // Validate Resident Role
        // ==========================================

        if (resident.getRole() != UserRole.RESIDENT) {

            throw new ResourceNotFoundException(
                    "Access denied."
            );

        }

        // ==========================================
        // Household
        // ==========================================

        Household household = resident.getHousehold();

        if (household == null) {

            throw new ResourceNotFoundException(
                    "No household assigned."
            );

        }

        // ==========================================
        // Water Bills
        // ==========================================

        List<WaterBill> waterBills = waterBillRepository
                .findByHousehold(household);

        // ==========================================
        // Convert To Response DTO
        // ==========================================

        return waterBills.stream()

                .map(bill -> ResidentWaterBillResponseDto.builder()

                        // ==========================================
                        // Bill Information
                        // ==========================================

                        .billId(
                                bill.getId()
                        )

                        .invoiceNumber(
                                bill.getInvoiceNumber()
                        )

                        .billStatus(
                                bill.getBillStatus()
                        )

                        // ==========================================
                        // Billing Cycle
                        // ==========================================

                        .billingCycle(
                                bill.getBillingCycle().getCycleName()
                        )

                        // ==========================================
                        // Consumption Details
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

    }

}