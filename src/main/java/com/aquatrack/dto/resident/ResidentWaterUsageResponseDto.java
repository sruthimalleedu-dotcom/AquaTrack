package com.aquatrack.dto.resident;

import com.aquatrack.enums.UploadType;
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
public class ResidentWaterUsageResponseDto {

    // ==========================================
    // Usage Information
    // ==========================================

    private Long usageId;

    private String billingCycle;

    private LocalDate readingDate;

    private BigDecimal previousReading;

    private BigDecimal currentReading;

    private BigDecimal waterUsage;

    private UploadType uploadType;

    private String remarks;

}