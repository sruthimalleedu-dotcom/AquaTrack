package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.auth.ForgotPasswordRequest;
import com.aquatrack.dto.auth.LoginRequest;
import com.aquatrack.dto.auth.LoginResponse;
import com.aquatrack.dto.auth.ResetPasswordRequest;
import com.aquatrack.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final AuthService authService;

    // ==========================================
    // Login
    // ==========================================

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Login successful.",
                        response
                )
        );

    }

    // ==========================================
    // Forgot Password
    // ==========================================

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        authService.forgotPassword(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Password reset link has been sent successfully."
                )
        );

    }

    // ==========================================
    // Reset Password
    // ==========================================

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        authService.resetPassword(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Password has been reset successfully."
                )
        );

    }

}