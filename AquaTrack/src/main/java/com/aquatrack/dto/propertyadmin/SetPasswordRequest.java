package com.aquatrack.dto.propertyadmin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetPasswordRequest {

    // ==========================================
    // Activation Token
    // ==========================================

    @NotBlank(message = "Token is required.")
    private String token;

    // ==========================================
    // Password
    // ==========================================

    @NotBlank(message = "Password is required.")
    @Size(
            min = 8,
            max = 100,
            message = "Password must be between 8 and 100 characters."
    )
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).+$",
            message = "Password must contain at least one uppercase letter, one lowercase letter and one number."
    )
    private String password;

    // ==========================================
    // Confirm Password
    // ==========================================

    @NotBlank(message = "Confirm Password is required.")
    private String confirmPassword;

}