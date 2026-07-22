package com.aquatrack.dto.apartment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApartmentCreateRequest {

    // ==========================================
    // Apartment Information
    // ==========================================

    @NotBlank(message = "Apartment name is required")
    private String apartmentName;

    @NotBlank(message = "Address Line 1 is required")
    private String addressLine1;

    private String addressLine2;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    @Pattern(
            regexp = "^\\d{6}$",
            message = "Pincode must contain exactly 6 digits"
    )
    private String pincode;

}