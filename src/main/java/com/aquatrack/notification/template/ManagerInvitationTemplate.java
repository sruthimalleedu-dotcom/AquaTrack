package com.aquatrack.notification.template;

import com.aquatrack.notification.model.ManagerInvitationEmailModel;
import org.springframework.stereotype.Component;

@Component
public class ManagerInvitationTemplate {

    // ==========================================
    // Build Manager Invitation Email
    // ==========================================

    public String build(
            ManagerInvitationEmailModel model
    ) {

        String buildingList = String.join(
                ", ",
                model.getBuildingNames()
        );

        return EmailTemplateBuilder.builder()

                // ==========================================
                // Greeting
                // ==========================================

                .greeting(
                        model.getManagerName()
                )

                // ==========================================
                // Invitation Message
                // ==========================================

                .message(
                        """
                        You have been invited to join <strong>AquaTrack</strong>
                        as a <strong>Building Manager</strong>.

                        <br><br>

                        <strong>Apartment:</strong><br>
                        %s

                        <br><br>

                        <strong>Assigned Buildings:</strong><br>
                        %s

                        <br><br>

                        <strong>Invited By:</strong><br>
                        %s

                        <br><br>

                        Click the button below to create your password and
                        activate your manager account.
                        """
                                .formatted(
                                        model.getApartmentName(),
                                        buildingList,
                                        model.getInvitedBy()
                                )
                )

                // ==========================================
                // Information Box
                // ==========================================

                .successBox(
                        "This invitation is valid for the next 24 hours."
                )

                // ==========================================
                // Activation Button
                // ==========================================

                .button(
                        "Create Password",
                        model.getActivationUrl()
                )

                // ==========================================
                // Divider
                // ==========================================

                .divider()

                // ==========================================
                // Closing Message
                // ==========================================

                .message(
                        """
                        If you were not expecting this invitation,
                        you can safely ignore this email.
                        """
                )

                // ==========================================
                // Footer
                // ==========================================

                .closing()

                .build();

    }

}