package com.aquatrack.dto.billingcycle;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBillingCycleRequestDto {

    // ==========================================
    // Billing Cycle
    // ==========================================

    @NotBlank(message = "Cycle name is required.")
    @Size(
            max = 100,
            message = "Cycle name cannot exceed 100 characters."
    )
    private String cycleName;

    @NotNull(message = "Start date is required.")
    private LocalDate startDate;

    @NotNull(message = "End date is required.")
    private LocalDate endDate;

    @NotNull(message = "Due date is required.")
    @FutureOrPresent(message = "Due date cannot be in the past.")
    private LocalDate dueDate;

}