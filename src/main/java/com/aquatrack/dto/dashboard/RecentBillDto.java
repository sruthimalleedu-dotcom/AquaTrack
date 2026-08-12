package com.aquatrack.dto.dashboard;

import com.aquatrack.enums.BillStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentBillDto {

    /**
     * Invoice number.
     */
    private String invoiceNumber;

    /**
     * House number.
     */
    private String houseNumber;

    /**
     * Building name.
     */
    private String buildingName;

    /**
     * Bill amount.
     */
    private BigDecimal totalAmount;

    /**
     * Due date.
     */
    private LocalDate dueDate;

    /**
     * Bill status.
     */
    private BillStatus billStatus;

}