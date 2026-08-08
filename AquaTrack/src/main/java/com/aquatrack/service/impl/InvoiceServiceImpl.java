package com.aquatrack.service.impl;

import com.aquatrack.entity.Invoice;
import com.aquatrack.repository.InvoiceRepository;
import com.aquatrack.entity.User;
import com.aquatrack.enums.UserRole;
import com.aquatrack.notification.model.EmailDetails;
import com.aquatrack.notification.service.EmailService;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Override
    public Invoice getInvoice(Long id) {

        return invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Invoice not found"));

    }

    @Override
    public void sendInvoiceEmail(Long invoiceId) {

        Invoice invoice = getInvoice(invoiceId);

        User resident = userRepository
                .findFirstByHouseholdAndRole(
                        invoice.getHousehold(),
                        UserRole.RESIDENT
                )
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        emailService.sendInvoiceEmail(
                resident.getEmail(),
                resident.getFirstName(),
                invoiceId,
                invoice.getTotalAmount()
        );
    }
}
