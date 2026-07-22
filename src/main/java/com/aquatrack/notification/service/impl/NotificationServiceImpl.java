package com.aquatrack.notification.service.impl;

import com.aquatrack.entity.PropertyRegistrationRequest;
import com.aquatrack.entity.User;
import com.aquatrack.notification.model.EmailDetails;
import com.aquatrack.notification.model.ManagerInvitationEmailModel;
import com.aquatrack.notification.model.ResidentInvitationEmailModel;
import com.aquatrack.notification.service.EmailService;
import com.aquatrack.notification.service.NotificationService;
import com.aquatrack.notification.template.ForgotPasswordTemplate;
import com.aquatrack.notification.template.ManagerInvitationTemplate;
import com.aquatrack.notification.template.ResidentInvitationTemplate;
import com.aquatrack.notification.template.PasswordResetSuccessTemplate;
import com.aquatrack.notification.template.PropertyAdminReactivatedTemplate;
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

    // ==========================================
    // Dependencies
    // ==========================================

    private final EmailService emailService;

    private final ManagerInvitationTemplate managerInvitationTemplate;

    private final ResidentInvitationTemplate residentInvitationTemplate;

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
    // Manager Invitation Email
    // ==========================================

    @Override
    public void sendManagerInvitationEmail(
            ManagerInvitationEmailModel model
    ) {

        String html =
                managerInvitationTemplate.build(model);

        EmailDetails email =
                new EmailDetails(
                        model.getEmail(),
                        "AquaTrack - Manager Invitation",
                        html,
                        true
                );

        emailService.sendEmail(email);

    }

    // ==========================================
    // Manager Invitation Email
    // ==========================================

    @Override
    public void sendResidentInvitationEmail(
            ResidentInvitationEmailModel model
    ) {

        String html =
                residentInvitationTemplate.build(model);

        EmailDetails email =
                new EmailDetails(
                        model.getEmail(),
                        "AquaTrack - Resident Invitation",
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

        // Future Milestone

    }

    // ==========================================
    // Forgot Password Email
    // ==========================================

    @Override
    public void sendForgotPasswordEmail(
            User user,
            String resetLink
    ) {

        String html =
                ForgotPasswordTemplate.build(
                        user.getFirstName(),
                        resetLink
                );

        EmailDetails email = new EmailDetails(
                user.getEmail(),
                "AquaTrack - Reset Your Password",
                html,
                true
        );

        emailService.sendEmail(email);

    }

    // ==========================================
    // Password Reset Success Email
    // ==========================================

    @Override
    public void sendPasswordResetSuccessEmail(
            User user
    ) {

        String html =
                PasswordResetSuccessTemplate.build(
                        user.getFirstName()
                );

        EmailDetails email = new EmailDetails(
                user.getEmail(),
                "AquaTrack - Password Reset Successful",
                html,
                true
        );

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