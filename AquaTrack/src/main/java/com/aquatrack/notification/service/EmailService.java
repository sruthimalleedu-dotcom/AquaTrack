package com.aquatrack.notification.service;

import com.aquatrack.notification.model.EmailDetails;

public interface EmailService {

    void sendEmail(EmailDetails emailDetails);

    void sendInvoiceEmail(String to,
                          String residentName,
                          Long invoiceId,
                          Double totalAmount);

}