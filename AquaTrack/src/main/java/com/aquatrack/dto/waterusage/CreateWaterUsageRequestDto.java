package com.aquatrack.dto.waterusage;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateWaterUsageRequestDto {

    /**
     * Reading Date
     */
    @NotNull(message = "Reading date is required.")
    @PastOrPresent(message = "Reading date cannot be in the future.")
    private LocalDate readingDate;

    /**
     * Previous Meter Reading
     */
    @NotNull(message = "Previous reading is required.")
    @DecimalMin(
            value = "0.0",
            inclusive = true,
            message = "Previous reading cannot be negative."
    )
    private BigDecimal previousReading;

    /**
     * Current Meter Reading
     */
    @NotNull(message = "Current reading is required.")
    @DecimalMin(
            value = "0.0",
            inclusive = true,
            message = "Current reading cannot be negative."
    )
    private BigDecimal currentReading;

    /**
     * Remarks
     */
    @Size(
            max = 255,
            message = "Remarks cannot exceed 255 characters."
    )
    private String remarks;

}