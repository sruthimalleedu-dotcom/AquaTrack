package com.aquatrack.service;

import com.aquatrack.entity.Invoice;

public interface InvoiceService {

    Invoice getInvoice(Long id);

    void sendInvoiceEmail(Long invoiceId);

}

