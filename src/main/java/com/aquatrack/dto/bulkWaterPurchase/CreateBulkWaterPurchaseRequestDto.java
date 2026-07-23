package com.aquatrack.dto.bulkWaterPurchase;

import com.aquatrack.enums.WaterSource;
import jakarta.validation.constraints.*;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBulkWaterPurchaseRequestDto {

    @NotNull(message = "Building ID is required")
    private Long buildingId;

    @NotNull(message = "Billing Cycle ID is required")
    private Long billingCycleId;

    @NotNull(message = "Purchase date is required")
    private LocalDate purchaseDate;

    @NotNull(message = "Water source is required")
    private WaterSource source;

    @NotNull(message = "Volume is required")
    @DecimalMin(value = "0.01", message = "Volume must be greater than 0")
    private BigDecimal volumeKL;

    @NotNull(message = "Unit cost is required")
    @DecimalMin(value = "0.00", inclusive = false, message = "Unit cost must be greater than 0")
    private BigDecimal unitCost;

    @Size(max = 150)
    private String supplierName;

    @Size(max = 100)
    private String invoiceNumber;

    @Size(max = 500)
    private String remarks;

}