package com.aquatrack.controller;

import com.aquatrack.service.InvoiceService;
import com.aquatrack.service.PdfService;
import com.aquatrack.util.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final PdfService pdfService;
    private final InvoiceService invoiceService;
    private final MessageUtil messageUtil;

    @GetMapping("/{invoiceId}/pdf")
    public ResponseEntity<byte[]> downloadInvoice(
            @PathVariable Long invoiceId
    ) throws IOException {

        byte[] pdf =
                pdfService.generateInvoice(invoiceId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=invoice-" + invoiceId + ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
    @PostMapping("/{invoiceId}/send-email")
    public ResponseEntity<String> sendInvoiceEmail(
            @PathVariable Long invoiceId) {

        invoiceService.sendInvoiceEmail(invoiceId);

        return ResponseEntity.ok(
                messageUtil.get("invoice.email.sent")
        );    }
}