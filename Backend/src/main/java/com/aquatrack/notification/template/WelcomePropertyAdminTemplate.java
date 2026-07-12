package com.aquatrack.notification.template;

public final class WelcomePropertyAdminTemplate {

    private WelcomePropertyAdminTemplate() {
    }

    public static String build(
            String adminName
    ) {

        String content = EmailTemplateBuilder.builder()

                .greeting(adminName)

                .message("""
                        Congratulations!

                        Your AquaTrack Property Admin account has been
                        activated successfully.
                        """)

                .successBox("""
                        Your account is now active and ready to use.
                        """)

                .message("""
                        You can now securely log in and start managing
                        your property using AquaTrack.
                        """)

                .button(
                        "Login to AquaTrack",
                        "https://aquatrack.com/login"
                )

                .divider()

                .message("""
                        Thank you for choosing AquaTrack.

                        We look forward to helping you manage your
                        apartment community more efficiently.
                        """)

                .closing()

                .build();

        return BaseEmailTemplate.buildTemplate(
                "Welcome to AquaTrack",
                content
        );

    }

}