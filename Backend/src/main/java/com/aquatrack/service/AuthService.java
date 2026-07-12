package com.aquatrack.service;

import com.aquatrack.dto.auth.ForgotPasswordRequest;
import com.aquatrack.dto.auth.LoginRequest;
import com.aquatrack.dto.auth.LoginResponse;
import com.aquatrack.dto.auth.ResetPasswordRequest;

public interface AuthService {

    // ==========================
    // Authentication
    // ==========================

    LoginResponse login(LoginRequest request);

    // ==========================
    // Password Reset
    // ==========================

    void forgotPassword(ForgotPasswordRequest request);

    void resetPassword(ResetPasswordRequest request);

}