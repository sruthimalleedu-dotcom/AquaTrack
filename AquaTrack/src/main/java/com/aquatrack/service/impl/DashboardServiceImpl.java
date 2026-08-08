package com.aquatrack.service.impl;

import com.aquatrack.dto.dashboard.ConsumptionComparisonResponse;
import com.aquatrack.dto.dashboard.CurrentBillResponse;
import com.aquatrack.dto.dashboard.InvoiceHistoryResponse;
import com.aquatrack.dto.dashboard.MonthlyUsageResponse;
import com.aquatrack.dto.dashboard.ResidentDashboardResponse;
import com.aquatrack.entity.Invoice;
import com.aquatrack.entity.WaterUsageLog;
import com.aquatrack.repository.InvoiceRepository;
import com.aquatrack.repository.WaterUsageLogRepository;
import com.aquatrack.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final InvoiceRepository invoiceRepository;
    private final WaterUsageLogRepository waterUsageLogRepository;

    @Override
    public ResidentDashboardResponse getDashboard(Long householdId) {

        CurrentBillResponse currentBill = getCurrentBill(householdId);

        List<InvoiceHistoryResponse> invoiceHistory =
                getInvoiceHistory(householdId);

        List<MonthlyUsageResponse> monthlyUsage =
                getMonthlyUsage(householdId);

        ConsumptionComparisonResponse comparison =
                compareConsumption(householdId);

        return ResidentDashboardResponse.builder()
                .currentBill(currentBill)
                .invoiceHistory(invoiceHistory)
                .monthlyUsage(monthlyUsage)
                .comparison(comparison)
                .build();
    }

    private CurrentBillResponse getCurrentBill(Long householdId) {

        Invoice invoice = invoiceRepository
                .findTopByHouseholdIdOrderByCreatedAtDesc(householdId)
                .orElseThrow(() ->
                        new RuntimeException("Invoice not found"));

        return CurrentBillResponse.builder()
                .invoiceId(invoice.getId())
                .houseNumber(invoice.getHousehold().getHouseNumber())
                .billingCycle(invoice.getBillingCycle().getCycleName())
                .totalAmount(BigDecimal.valueOf(invoice.getTotalAmount()))
                .paid(invoice.getPaid())
                .build();
    }

    private List<InvoiceHistoryResponse> getInvoiceHistory(Long householdId) {

        return invoiceRepository
                .findByHouseholdIdOrderByCreatedAtDesc(householdId)
                .stream()
                .map(invoice -> InvoiceHistoryResponse.builder()
                        .invoiceId(invoice.getId())
                        .billingCycle(invoice.getBillingCycle().getCycleName())
                        .totalAmount(BigDecimal.valueOf(invoice.getTotalAmount()))
                        .paid(invoice.getPaid())
                        .build())
                .toList();
    }

    private List<MonthlyUsageResponse> getMonthlyUsage(Long householdId) {

        return waterUsageLogRepository
                .findByHouseholdIdOrderByReadingDateAsc(householdId)
                .stream()
                .map(log -> MonthlyUsageResponse.builder()
                        .month(log.getReadingDate().getMonth().name())
                        .usage(log.getWaterUsage())
                        .build())
                .toList();
    }

    private ConsumptionComparisonResponse compareConsumption(Long householdId) {

        WaterUsageLog latestLog = waterUsageLogRepository
                .findTopByHouseholdIdOrderByReadingDateDesc(householdId)
                .orElseThrow(() ->
                        new RuntimeException("No usage found"));

        BigDecimal householdUsage = latestLog.getWaterUsage();

        BigDecimal apartmentAverage =
                waterUsageLogRepository.getApartmentAverage(householdId);

        if (apartmentAverage == null) {
            apartmentAverage = BigDecimal.ZERO;
        }

        BigDecimal difference =
                householdUsage.subtract(apartmentAverage);

        String message;

        if (difference.compareTo(BigDecimal.ZERO) > 0) {
            message = "You are consuming more water than apartment average.";
        } else {
            message = "Great! Your consumption is below apartment average.";
        }

        return ConsumptionComparisonResponse.builder()
                .householdUsage(householdUsage)
                .apartmentAverage(apartmentAverage)
                .difference(difference)
                .message(message)
                .build();
    }
}