package com.aquatrack.notification.service.impl;

import com.aquatrack.config.AquaTrackMailProperties;
import com.aquatrack.notification.exception.EmailSendingException;
import com.aquatrack.notification.model.EmailDetails;
import com.aquatrack.notification.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import java.io.UnsupportedEncodingException;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;
    private final AquaTrackMailProperties mailProperties;

    public EmailServiceImpl(
            JavaMailSender mailSender,
            AquaTrackMailProperties mailProperties
    ) {
        this.mailSender = mailSender;
        this.mailProperties = mailProperties;
    }

    /**
     * Sends a plain text or HTML email.
     *
     * @param emailDetails Email request details.
     */
    @Override
    public void sendEmail(EmailDetails emailDetails) {

        try {

            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(
                    new InternetAddress(
                            mailProperties.getFrom(),
                            mailProperties.getSenderName()
                    )
            );

            // Recipient
            helper.setTo(emailDetails.getTo());

            // Subject
            helper.setSubject(emailDetails.getSubject());

            // Email Body
            helper.setText(
                    emailDetails.getBody(),
                    emailDetails.isHtml()
            );

            // CC Recipients
            if (emailDetails.hasCc()) {
                helper.setCc(emailDetails.getCc().toArray(new String[0]));
            }

            // BCC Recipients
            if (emailDetails.hasBcc()) {
                helper.setBcc(emailDetails.getBcc().toArray(new String[0]));
            }

            // Send Email
            mailSender.send(mimeMessage);

            LOGGER.info(
                    "Email sent successfully to '{}'",
                    emailDetails.getTo()
            );

        } catch (MessagingException | MailException |
                 UnsupportedEncodingException ex) {

            LOGGER.error(
                    "Failed to send email to '{}'",
                    emailDetails.getTo(),
                    ex
            );

            throw new EmailSendingException(
                    "Failed to send email.",
                    ex
            );
        }
    }
}