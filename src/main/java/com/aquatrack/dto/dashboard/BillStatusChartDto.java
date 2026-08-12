package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Bill status chart.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BillStatusChartDto {

    /**
     * Paid bills.
     */
    private Long paid;

    /**
     * Pending bills.
     */
    private Long pending;

    /**
     * Overdue bills.
     */
    private Long overdue;

}