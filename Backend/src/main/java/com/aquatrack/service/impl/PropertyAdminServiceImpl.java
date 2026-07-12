package com.aquatrack.service.impl;

import com.aquatrack.dto.propertyadmin.PropertyAdminActivationResponse;
import com.aquatrack.dto.propertyadmin.SetPasswordRequest;
import com.aquatrack.service.PropertyAdminService;
import com.aquatrack.entity.PropertyAdminInvitation;
import com.aquatrack.entity.User;
import com.aquatrack.repository.PropertyAdminInvitationRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.notification.service.NotificationService;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertyAdminServiceImpl
        implements PropertyAdminService {


    // ==========================================
    // Dependencies
    // ==========================================

    private final PropertyAdminInvitationRepository invitationRepository;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final NotificationService notificationService;

    // ==========================================
    // Validate Property Admin Activation Token
    // ==========================================

    @Override
    public PropertyAdminActivationResponse validateActivationToken(
            String token) {

        // ==========================================
        // Find Invitation
        // ==========================================

        PropertyAdminInvitation invitation =
                invitationRepository.findByToken(token)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid activation token."
                                ));

        // ==========================================
        // Check Whether Token Is Already Used
        // ==========================================

        if (Boolean.TRUE.equals(invitation.getIsUsed())) {

            throw new IllegalStateException(
                    "This activation link has already been used."
            );

        }

        // ==========================================
        // Check Token Expiration
        // ==========================================

        if (invitation.getExpiresAt().isBefore(LocalDateTime.now())) {

            throw new IllegalStateException(
                    "This activation link has expired."
            );

        }

        // ==========================================
        // Get Property Admin
        // ==========================================

        User propertyAdmin = invitation.getUser();

        // ==========================================
        // Build Activation Response
        // ==========================================

        return PropertyAdminActivationResponse.builder()

                .firstName(
                        propertyAdmin.getFirstName()
                )

                .lastName(
                        propertyAdmin.getLastName()
                )

                .email(
                        propertyAdmin.getEmail()
                )

                .token(
                        token
                )

                .tokenValid(
                        true
                )

                .build();

    }

    // ==========================================
    // Set Password & Activate Property Admin
    // ==========================================

    @Override
    public void setPassword(
            SetPasswordRequest request) {

        // ==========================================
        // Find Invitation
        // ==========================================

        PropertyAdminInvitation invitation =
                invitationRepository.findByToken(request.getToken())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid activation token."
                                ));

        // ==========================================
        // Check Whether Token Is Already Used
        // ==========================================

        if (Boolean.TRUE.equals(invitation.getIsUsed())) {

            throw new IllegalStateException(
                    "This activation link has already been used."
            );

        }

        // ==========================================
        // Check Token Expiration
        // ==========================================

        if (invitation.getExpiresAt().isBefore(LocalDateTime.now())) {

            throw new IllegalStateException(
                    "This activation link has expired."
            );

        }

        // ==========================================
        // Validate Password Confirmation
        // ==========================================

        if (!request.getPassword().equals(request.getConfirmPassword())) {

            throw new IllegalArgumentException(
                    "Password and Confirm Password do not match."
            );

        }

        // ==========================================
        // Get Property Admin
        // ==========================================

        User propertyAdmin = invitation.getUser();

        // ==========================================
        // Update User Password
        // ==========================================

        propertyAdmin.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // ==========================================
        // Activate Property Admin Account
        // ==========================================

        propertyAdmin.setIsActive(true);

        // ==========================================
        // Save Updated User
        // ==========================================

        userRepository.save(propertyAdmin);

        // ==========================================
        // Mark Invitation As Used
        // ==========================================

        invitation.setIsUsed(true);

        invitationRepository.save(invitation);

        // ==========================================
        // Send Welcome Email
        // ==========================================

        notificationService.sendWelcomeEmail(
                propertyAdmin
        );
    }



}