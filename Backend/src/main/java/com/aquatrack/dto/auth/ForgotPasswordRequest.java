package com.aquatrack.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ForgotPasswordRequest {

    // ==========================
    // Email
    // ==========================

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    private String email;

}
