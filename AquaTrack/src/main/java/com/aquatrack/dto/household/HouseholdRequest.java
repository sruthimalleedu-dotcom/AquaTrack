package com.aquatrack.dto.household;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HouseholdRequest {

    // ==========================================
    // Household Information
    // ==========================================

    @NotBlank(message = "House number is required.")
    @Size(max = 20, message = "House number cannot exceed 20 characters.")
    private String houseNumber;

    /**
     * Temporary field.
     * Will be removed once Water Meter module is implemented.
     */
    @NotBlank(message = "Meter number is required.")
    @Size(max = 100, message = "Meter number cannot exceed 100 characters.")
    private String meterNumber;

}