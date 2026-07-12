package com.aquatrack.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResetPasswordRequest {

    // ==========================================
    // Reset Token
    // ==========================================

    @NotBlank(message = "Reset token is required")
    private String token;

    // ==========================================
    // New Password
    // ==========================================

    @NotBlank(message = "New password is required")
    @Size(
            min = 8,
            max = 100,
            message = "Password must be between 8 and 100 characters"
    )
    private String newPassword;

    // ==========================================
    // Confirm Password
    // ==========================================

    @NotBlank(message = "Confirm password is required")
    @Size(
            min = 8,
            max = 100,
            message = "Confirm password must be between 8 and 100 characters"
    )
    private String confirmPassword;

}
