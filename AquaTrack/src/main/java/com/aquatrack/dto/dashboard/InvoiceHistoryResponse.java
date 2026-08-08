package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceHistoryResponse {

    private Long invoiceId;
    private String billingCycle;
    private BigDecimal totalAmount;
    private Boolean paid;
}