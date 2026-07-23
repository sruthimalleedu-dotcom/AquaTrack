package com.aquatrack.dto.bulkWaterPurchase;

import com.aquatrack.enums.WaterSource;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BulkWaterPurchaseResponseDto {

    private Long id;

    private Long buildingId;
    private String buildingName;

    private Long billingCycleId;

    private LocalDate purchaseDate;

    private WaterSource source;

    private BigDecimal volumeKL;

    private BigDecimal unitCost;

    private BigDecimal totalCost;

    private String supplierName;

    private String invoiceNumber;

    private String remarks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}