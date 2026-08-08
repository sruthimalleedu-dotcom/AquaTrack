package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResidentDashboardResponse {

    private CurrentBillResponse currentBill;

    private List<InvoiceHistoryResponse> invoiceHistory;

    private List<MonthlyUsageResponse> monthlyUsage;

    private ConsumptionComparisonResponse comparison;

}