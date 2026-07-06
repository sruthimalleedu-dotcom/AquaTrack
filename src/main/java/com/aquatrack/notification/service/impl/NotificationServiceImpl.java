package com.aquatrack.notification.service.impl;

import com.aquatrack.entity.PropertyRegistrationRequest;
import com.aquatrack.entity.User;
import com.aquatrack.notification.model.EmailDetails;
import com.aquatrack.notification.service.EmailService;
import com.aquatrack.notification.service.NotificationService;
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
    public void sendPropertyAdminActivationEmail(User user) {

        // Will be implemented in Milestone 6

    }

    // ==========================================
    // Forgot Password Email
    // ==========================================

    @Override
    public void sendForgotPasswordEmail(
            User user,
            String resetLink
    ) {

        // Will be implemented in Milestone 6

    }

    // ==========================================
    // Password Reset Success Email
    // ==========================================

    @Override
    public void sendPasswordResetSuccessEmail(User user) {

        // Will be implemented in Milestone 7

    }

    // ==========================================
// Send Welcome Email
// ==========================================

    @Override
    public void sendWelcomeEmail(
            User user) {

        // ==========================================
        // Build HTML Email
        // ==========================================

        String html =
                WelcomePropertyAdminTemplate.build(
                        user.getFirstName()
                );

        // ==========================================
        // Prepare Email
        // ==========================================

        EmailDetails email = new EmailDetails(
                user.getEmail(),
                "Welcome to AquaTrack",
                html,
                true
        );

        // ==========================================
        // Send Email
        // ==========================================

        emailService.sendEmail(email);

    }

}