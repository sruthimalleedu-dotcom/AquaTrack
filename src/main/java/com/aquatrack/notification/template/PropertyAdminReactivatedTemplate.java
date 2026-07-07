package com.aquatrack.notification.template;

public final class PropertyAdminReactivatedTemplate {

    private PropertyAdminReactivatedTemplate() {
    }

    public static String build(
            String adminName
    ) {

        String content = EmailTemplateBuilder.builder()

                .greeting(adminName)

                .message("""
                        Great news! Your AquaTrack Property
                        Admin account has been successfully
                        reactivated by the AquaTrack
                        Administrator.
                        """)

                .successBox("""
                        Your account is now active again.
                        You can sign in and continue managing
                        your property without any restrictions.
                        """)

                .message("""
                        Thank you for being a valued member
                        of AquaTrack. We are happy to have
                        you back.
                        """)

                .button(
                        "Login Now",
                        "http://localhost:3000/login"
                )

                .divider()

                .message("""
                        If you have any questions or require
                        assistance, feel free to contact the
                        AquaTrack Support Team.
                        """)

                .closing()

                .build();

        return BaseEmailTemplate.buildTemplate(
                "Account Reactivated",
                content
        );

    }

}