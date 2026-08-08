package com.aquatrack.controller;

import com.aquatrack.notification.model.EmailDetails;
import com.aquatrack.notification.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailTestController {

    private final EmailService emailService;

    @GetMapping("/test")
    public String testEmail() {

        EmailDetails email = new EmailDetails(
                "aquatrack771@gmail.com",   // apna email
                "AquaTrack Test",
                "<h2>Email integration is working!</h2>",
                true
        );

        emailService.sendEmail(email);

        return "Email sent successfully.";
    }
}