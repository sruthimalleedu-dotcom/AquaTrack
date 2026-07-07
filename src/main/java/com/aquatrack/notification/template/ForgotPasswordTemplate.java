package com.aquatrack.notification.template;

public final class ForgotPasswordTemplate {

    private ForgotPasswordTemplate() {
    }

    public static String build(
            String firstName,
            String resetLink
    ) {

        String content = EmailTemplateBuilder.builder()

                .greeting(firstName)

                .message("""
                        We received a request to reset your
                        AquaTrack account password.
                        """)

                .warningBox("""
                        If you requested this password reset,
                        click the button below to create a
                        new password.
                        """)

                .button(
                        "Reset Password",
                        resetLink
                )

                .message("""
                        This password reset link is valid for
                        30 minutes. If the link expires, you
                        can request a new one.
                        """)

                .divider()

                .message("""
                        If you did not request a password reset,
                        you can safely ignore this email. Your
                        account will remain secure.
                        """)

                .closing()

                .build();

        return BaseEmailTemplate.buildTemplate(
                "Reset Your Password",
                content
        );

    }

}
