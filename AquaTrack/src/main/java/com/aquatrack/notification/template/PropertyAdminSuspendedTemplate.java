package com.aquatrack.notification.template;

public final class PropertyAdminSuspendedTemplate {

    private PropertyAdminSuspendedTemplate() {
    }

    public static String build(
            String adminName
    ) {

        String content = EmailTemplateBuilder.builder()

                .greeting(adminName)

                .message("""
                        We would like to inform you that your
                        AquaTrack Property Admin account has
                        been temporarily suspended.
                        """)

                .warningBox("""
                        Your account is currently inactive.
                        You will not be able to access the
                        AquaTrack platform until it is reactivated.
                        """)

                .message("""
                        If you believe this suspension was made
                        in error, please contact the AquaTrack
                        Support Team for assistance.
                        """)

                .button(
                        "Contact Support",
                        "https://aquatrack.com/support"
                )

                .divider()

                .message("""
                        Thank you for your understanding.
                        """)

                .closing()

                .build();

        return BaseEmailTemplate.buildTemplate(
                "Account Suspended",
                content
        );

    }

}