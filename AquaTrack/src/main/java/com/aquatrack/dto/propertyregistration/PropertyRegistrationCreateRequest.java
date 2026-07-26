package com.aquatrack.dto.propertyregistration;

import com.aquatrack.enums.PropertyType;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyRegistrationCreateRequest {

    // ==========================
    // Company Information
    // ==========================

    @NotBlank(message = "Company/Individual name is required.")
    @Size(max = 200, message = "Company/Individual name cannot exceed 200 characters.")
    private String companyName;

    @NotBlank(message = "Contact person name is required.")
    @Size(max = 150, message = "Contact person name cannot exceed 150 characters.")
    private String contactPersonName;

    @NotBlank(message = "Email is required.")
    @Email(message = "Invalid email address.")
    private String email;

    @NotBlank(message = "Phone number is required.")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Invalid Indian mobile number."
    )
    private String phone;

    // ==========================
    // Property Details
    // ==========================

    @NotNull(message = "Property type is required.")
    private PropertyType propertyType;

    @NotNull(message = "Number of apartments is required.")
    @Min(value = 1, message = "Number of apartments must be at least 1.")
    private Integer numberOfApartments;

    @NotBlank(message = "Address is required.")
    @Size(max = 500)
    private String address;

    @NotBlank(message = "City is required.")
    @Size(max = 100)
    private String city;

    @NotBlank(message = "State is required.")
    @Size(max = 100)
    private String state;

    @NotBlank(message = "Pincode is required.")
    @Pattern(
            regexp = "^[1-9][0-9]{5}$",
            message = "Invalid Indian pincode."
    )
    private String pincode;

}