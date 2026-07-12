package com.aquatrack.notification.template;

public final class PasswordResetSuccessTemplate {

    private PasswordResetSuccessTemplate() {
    }

    public static String build(
            String firstName
    ) {

        String content = EmailTemplateBuilder.builder()

                .greeting(firstName)

                .message("""
                        Your AquaTrack account password has
                        been successfully updated.
                        """)

                .successBox("""
                        Your password has been changed
                        successfully. You can now sign in
                        using your new password.
                        """)

                .button(
                        "Login Now",
                        "http://localhost:3000/login"
                )

                .divider()

                .message("""
                        If you did not perform this password
                        change, please contact the AquaTrack
                        Support Team immediately and secure
                        your account.
                        """)

                .closing()

                .build();

        return BaseEmailTemplate.buildTemplate(
                "Password Reset Successful",
                content
        );

    }

}