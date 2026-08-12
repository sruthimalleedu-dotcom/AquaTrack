package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payment status chart data.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentStatusChartDto {

    /**
     * Total paid bills.
     */
    private Long paidBills;

    /**
     * Total pending bills.
     */
    private Long pendingBills;

}
