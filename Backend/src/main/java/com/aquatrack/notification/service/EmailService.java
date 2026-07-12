package com.aquatrack.notification.service;

import com.aquatrack.notification.model.EmailDetails;

public interface EmailService {

    /**
     * Send a plain text or HTML email.
     *
     * @param emailDetails Email request details.
     */
    void sendEmail(EmailDetails emailDetails);

}