package com.aquatrack.dto.manager;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateManagerInvitationRequestDto {

    // ==========================
    // Manager Information
    // ==========================

    @NotBlank(message = "First name is required.")
    @Size(max = 100, message = "First name cannot exceed 100 characters.")
    private String firstName;

    @Size(max = 100, message = "Last name cannot exceed 100 characters.")
    private String lastName;

    @NotBlank(message = "Email is required.")
    @Email(message = "Please enter a valid email address.")
    @Size(max = 255, message = "Email cannot exceed 255 characters.")
    private String email;

    @NotBlank(message = "Phone number is required.")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Please enter a valid 10-digit Indian mobile number."
    )
    private String phone;

    // ==========================
    // Assignment
    // ==========================

    @NotNull(message = "Apartment ID is required.")
    private Long apartmentId;

    @NotNull(message = "Building ID is required.")
    private Long buildingId;

}