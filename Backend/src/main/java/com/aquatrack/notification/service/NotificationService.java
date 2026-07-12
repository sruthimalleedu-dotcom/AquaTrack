package com.aquatrack.notification.service;

import com.aquatrack.entity.PropertyRegistrationRequest;
import com.aquatrack.entity.User;

public interface NotificationService {

    // ==========================================
    // Property Registration Notifications
    // ==========================================

    void sendRegistrationApprovedEmail(
            PropertyRegistrationRequest request,
            String activationLink
    );

    void sendRegistrationRejectedEmail(
            PropertyRegistrationRequest request
    );

    // ==========================================
    // Property Admin Notifications
    // ==========================================

    void sendPropertyAdminActivationEmail(
            User user
    );

    // ==========================================
    // Password Notifications
    // ==========================================

    void sendForgotPasswordEmail(
            User user,
            String resetLink
    );

    void sendPasswordResetSuccessEmail(
            User user
    );

    // ==========================================
    // Welcome Email
    // ==========================================

    void sendWelcomeEmail(
            User user
    );

    // ==========================================
    // Property Admin Suspended Email
    // ==========================================

    void sendPropertyAdminSuspendedEmail(
            User user
    );

    // ==========================================
// Property Admin Reactivated Email
// ==========================================

    void sendPropertyAdminReactivatedEmail(
            User user
    );

}