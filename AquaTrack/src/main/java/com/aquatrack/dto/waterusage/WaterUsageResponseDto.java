package com.aquatrack.dto.waterusage;

import com.aquatrack.enums.UploadType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WaterUsageResponseDto {

    private Long id;

    private Long householdId;

    private String houseNumber;

    private Long buildingId;

    private String buildingName;

    private Long billingCycleId;

    private String billingCycleName;

    private LocalDate readingDate;

    private BigDecimal previousReading;

    private BigDecimal currentReading;

    private BigDecimal waterUsage;

    private UploadType uploadType;

    private Long uploadedById;

    private String uploadedByName;

    private String remarks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}