package com.aquatrack.notification.service.impl;

import com.aquatrack.entity.PropertyRegistrationRequest;
import com.aquatrack.entity.User;
import com.aquatrack.notification.model.EmailDetails;
import com.aquatrack.notification.service.EmailService;
import com.aquatrack.notification.service.NotificationService;
import com.aquatrack.notification.template.PropertyAdminReactivatedTemplate;
import com.aquatrack.notification.template.ForgotPasswordTemplate;
import com.aquatrack.notification.template.PasswordResetSuccessTemplate;
import com.aquatrack.notification.template.PropertyAdminSuspendedTemplate;
import com.aquatrack.notification.template.RegistrationApprovedTemplate;
import com.aquatrack.notification.template.RegistrationRejectedTemplate;
import com.aquatrack.notification.template.WelcomePropertyAdminTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl
        implements NotificationService {

    private final EmailService emailService;

    // ==========================================
    // Registration Approved Email
    // ==========================================

    @Override
    public void sendRegistrationApprovedEmail(
            PropertyRegistrationRequest request,
            String activationLink
    ) {

        String html = RegistrationApprovedTemplate.build(
                request.getContactPersonName(),
                request.getCompanyName(),
                activationLink
        );

        EmailDetails email = new EmailDetails(
                request.getEmail(),
                "AquaTrack - Registration Approved",
                html,
                true
        );

        emailService.sendEmail(email);

    }

    // ==========================================
    // Registration Rejected Email
    // ==========================================

    @Override
    public void sendRegistrationRejectedEmail(
            PropertyRegistrationRequest request
    ) {

        String html = RegistrationRejectedTemplate.build(
                request.getContactPersonName(),
                request.getCompanyName(),
                request.getRejectionReason(),
                "https://aquatrack.com/support"
        );

        EmailDetails email = new EmailDetails(
                request.getEmail(),
                "AquaTrack - Registration Rejected",
                html,
                true
        );

        emailService.sendEmail(email);

    }

    // ==========================================
    // Property Admin Activation Email
    // ==========================================

    @Override
    public void sendPropertyAdminActivationEmail(
            User user
    ) {

        // Will be implemented in future milestone

    }

    // ==========================================
    // Forgot Password Email
    // ==========================================

    @Override
    public void sendForgotPasswordEmail(
            User user,
            String resetLink
    ) {

        // ==========================================
        // Build HTML Email
        // ==========================================

        String html =
                ForgotPasswordTemplate.build(
                        user.getFirstName(),
                        resetLink
                );

        // ==========================================
        // Prepare Email
        // ==========================================

        EmailDetails email = new EmailDetails(
                user.getEmail(),
                "AquaTrack - Reset Your Password",
                html,
                true
        );

        // ==========================================
        // Send Email
        // ==========================================

        emailService.sendEmail(email);

    }

    // ==========================================
    // Password Reset Success Email
    // ==========================================

    @Override
    public void sendPasswordResetSuccessEmail(
            User user
    ) {

        // ==========================================
        // Build HTML Email
        // ==========================================

        String html =
                PasswordResetSuccessTemplate.build(
                        user.getFirstName()
                );

        // ==========================================
        // Prepare Email
        // ==========================================

        EmailDetails email = new EmailDetails(
                user.getEmail(),
                "AquaTrack - Password Reset Successful",
                html,
                true
        );

        // ==========================================
        // Send Email
        // ==========================================

        emailService.sendEmail(email);

    }

    // ==========================================
    // Welcome Email
    // ==========================================

    @Override
    public void sendWelcomeEmail(
            User user
    ) {

        String html =
                WelcomePropertyAdminTemplate.build(
                        user.getFirstName()
                );

        EmailDetails email = new EmailDetails(
                user.getEmail(),
                "Welcome to AquaTrack",
                html,
                true
        );

        emailService.sendEmail(email);

    }

    // ==========================================
    // Property Admin Suspended Email
    // ==========================================

    @Override
    public void sendPropertyAdminSuspendedEmail(
            User user
    ) {

        String html =
                PropertyAdminSuspendedTemplate.build(
                        user.getFirstName()
                );

        EmailDetails email = new EmailDetails(
                user.getEmail(),
                "AquaTrack - Account Suspended",
                html,
                true
        );

        emailService.sendEmail(email);

    }

    // ==========================================
    // Property Admin Reactivated Email
    // ==========================================

    @Override
    public void sendPropertyAdminReactivatedEmail(
            User user
    ) {

        String html =
                PropertyAdminReactivatedTemplate.build(
                        user.getFirstName()
                );

        EmailDetails email = new EmailDetails(
                user.getEmail(),
                "AquaTrack - Account Reactivated",
                html,
                true
        );

        emailService.sendEmail(email);

    }

}