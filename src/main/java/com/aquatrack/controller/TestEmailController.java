package com.aquatrack.controller;

import com.aquatrack.notification.model.EmailDetails;
import com.aquatrack.notification.service.EmailService;
import com.aquatrack.notification.template.RegistrationApprovedTemplate;
import com.aquatrack.notification.template.RegistrationRejectedTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test/email")
public class TestEmailController {

    private final EmailService emailService;

    public TestEmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> sendTestEmail(
            @RequestParam String to
    ) {

        String html = RegistrationRejectedTemplate.build(
                "Subhadip Maity",
                "Green Valley Residency",
                "The submitted apartment registration documents could not be verified. Please upload valid documents and submit your request again.",
                "https://aquatrack.com/support"
        );

        EmailDetails email = new EmailDetails(
                to,
                "AquaTrack - Registration Rejected",
                html,
                true
        );

        emailService.sendEmail(email);

        return ResponseEntity.ok("Registration rejection email sent successfully.");
    }
}