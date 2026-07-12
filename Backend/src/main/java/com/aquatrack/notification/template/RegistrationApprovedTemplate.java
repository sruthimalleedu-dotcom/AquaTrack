package com.aquatrack.notification.template;

public final class RegistrationApprovedTemplate {

    private RegistrationApprovedTemplate() {
    }

    public static String build(
            String applicantName,
            String propertyName,
            String activationLink
    ) {

        String content = EmailTemplateBuilder.builder()

                .greeting(applicantName)

                .message("""
                        Congratulations!

                        Your apartment registration request has been approved by the AquaTrack Super Administrator.
                        You can now activate your Property Admin account and start managing your apartment.
                        """)

                .successBox("""
                        Registration Approved Successfully
                        """)

                .button(
                        "Activate Account",
                        activationLink
                )

                .divider()

                .message("""
                        Apartment Name:
                        <strong>%s</strong>
                        """.formatted(propertyName))

                .closing()

                .build();

        return BaseEmailTemplate.buildTemplate(
                "Registration Approved",
                content
        );
    }

}