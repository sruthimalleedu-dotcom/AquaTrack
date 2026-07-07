package com.aquatrack.service.impl;

import com.aquatrack.dto.auth.ForgotPasswordRequest;
import com.aquatrack.dto.auth.LoginRequest;
import com.aquatrack.dto.auth.LoginResponse;
import com.aquatrack.dto.auth.ResetPasswordRequest;
import com.aquatrack.entity.PasswordResetToken;
import com.aquatrack.entity.User;
import com.aquatrack.notification.service.NotificationService;
import com.aquatrack.repository.PasswordResetTokenRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.security.CustomUserDetails;
import com.aquatrack.security.JwtService;
import com.aquatrack.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    private final PasswordEncoder passwordEncoder;

    private final NotificationService notificationService;

    // ==========================================
    // Login
    // ==========================================

    @Override
    public LoginResponse login(
            LoginRequest request
    ) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password."
                        )
                );

        String token = jwtService.generateToken(
                new CustomUserDetails(user)
        );

        return LoginResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();

    }

    // ==========================================
    // Forgot Password
    // ==========================================

    @Override
    public void forgotPassword(
            ForgotPasswordRequest request
    ) {

        // ==========================================
        // Find User
        // ==========================================

        User user = userRepository.findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with email: "
                                        + request.getEmail()
                        )
                );

        // ==========================================
        // Remove Previous Reset Tokens
        // ==========================================

        passwordResetTokenRepository.deleteAllByUser(
                user
        );

        // ==========================================
        // Generate Reset Token
        // ==========================================

        String token = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken =
                PasswordResetToken.builder()
                        .user(user)
                        .token(token)
                        .expiresAt(
                                LocalDateTime.now()
                                        .plusMinutes(15)
                        )
                        .build();

        passwordResetTokenRepository.save(
                passwordResetToken
        );

        // ==========================================
        // Build Reset Link
        // ==========================================

        String resetLink =
                "http://localhost:3000/reset-password?token="
                        + token;

        // ==========================================
        // Send Forgot Password Email
        // ==========================================

        notificationService.sendForgotPasswordEmail(
                user,
                resetLink
        );

    }

    // ==========================================
    // Reset Password
    // ==========================================

    @Override
    public void resetPassword(
            ResetPasswordRequest request
    ) {

        // ==========================================
        // Find Password Reset Token
        // ==========================================

        PasswordResetToken passwordResetToken =
                passwordResetTokenRepository
                        .findByToken(request.getToken())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid password reset token."
                                )
                        );

        // ==========================================
        // Validate Token Usage
        // ==========================================

        if (Boolean.TRUE.equals(
                passwordResetToken.getUsed()
        )) {

            throw new RuntimeException(
                    "Password reset token has already been used."
            );

        }

        // ==========================================
        // Validate Token Expiry
        // ==========================================

        if (passwordResetToken.getExpiresAt()
                .isBefore(LocalDateTime.now())) {

            throw new RuntimeException(
                    "Password reset token has expired."
            );

        }

        // ==========================================
        // Validate Password Confirmation
        // ==========================================

        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new IllegalArgumentException(
                    "New password and confirm password do not match."
            );

        }

        // ==========================================
        // Update User Password
        // ==========================================

        User user = passwordResetToken.getUser();

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(
                user
        );

        // ==========================================
        // Mark Token As Used
        // ==========================================

        passwordResetToken.setUsed(
                true
        );

        passwordResetTokenRepository.save(
                passwordResetToken
        );

        // ==========================================
        // Send Password Reset Success Email
        // ==========================================

        notificationService.sendPasswordResetSuccessEmail(
                user
        );

    }

}