package com.aquatrack.service.impl;

import com.aquatrack.dto.auth.ForgotPasswordRequest;
import com.aquatrack.dto.auth.LoginRequest;
import com.aquatrack.dto.auth.LoginResponse;
import com.aquatrack.dto.auth.ResetPasswordRequest;
import com.aquatrack.entity.PasswordResetToken;
import com.aquatrack.entity.User;
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

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    private final PasswordEncoder passwordEncoder;

    // ==========================================
    // Login
    // ==========================================

    @Override
    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

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
    public void forgotPassword(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with email: " + request.getEmail()
                        ));

        // Remove previous reset tokens
        passwordResetTokenRepository.deleteAllByUser(user);

        // Generate new reset token
        String token = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                .user(user)
                .token(token)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();

        passwordResetTokenRepository.save(passwordResetToken);

        // TODO: Replace with Email Service
        System.out.println("==========================================");
        System.out.println("Password Reset Link");
        System.out.println("http://localhost:8080/api/auth/reset-password?token=" + token);
        System.out.println("==========================================");

    }

    // ==========================================
    // Reset Password
    // ==========================================

    @Override
    public void resetPassword(ResetPasswordRequest request) {

        PasswordResetToken passwordResetToken = passwordResetTokenRepository
                .findByToken(request.getToken())
                .orElseThrow(() ->
                        new RuntimeException("Invalid password reset token"));

        // Check if token has already been used
        if (Boolean.TRUE.equals(passwordResetToken.getUsed())) {
            throw new RuntimeException("Password reset token has already been used");
        }

        // Check token expiry
        if (passwordResetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Password reset token has expired");
        }

        // Update user password
        User user = passwordResetToken.getUser();

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);

        // Mark token as used
        passwordResetToken.setUsed(true);

        passwordResetTokenRepository.save(passwordResetToken);

    }

}