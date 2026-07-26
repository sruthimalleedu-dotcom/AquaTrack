package com.aquatrack.notification.template;

public final class RegistrationRejectedTemplate {

    private RegistrationRejectedTemplate() {
    }

    public static String build(
            String applicantName,
            String propertyName,
            String rejectionReason,
            String supportUrl
    ) {

        String content = EmailTemplateBuilder.builder()

                .greeting(applicantName)

                .message("""
                        Thank you for registering your apartment with AquaTrack.

                        After reviewing your registration request,
                        we are unable to approve it at this time.
                        """)

                .warningBox("""
                        Registration Request Rejected
                        """)

                .message("""
                        <strong>Apartment Name:</strong><br>
                        %s
                        """.formatted(propertyName))

                .message("""
                        <strong>Reason:</strong><br>
                        %s
                        """.formatted(rejectionReason))

                .button(
                        "Contact Support",
                        supportUrl
                )

                .divider()

                .message("""
                        You may correct the above issue and
                        submit your registration again.

                        If you believe this decision was made in error,
                        please contact our support team.
                        """)

                .closing()

                .build();

        return BaseEmailTemplate.buildTemplate(
                "Registration Rejected",
                content
        );

    }

}