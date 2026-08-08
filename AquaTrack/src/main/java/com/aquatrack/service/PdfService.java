package com.aquatrack.service;

import java.io.IOException;

public interface PdfService {

    byte[] generateInvoice(Long invoiceId) throws IOException;

}