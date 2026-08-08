package com.aquatrack.service.impl;

import com.aquatrack.entity.Invoice;
import com.aquatrack.service.InvoiceService;
import com.aquatrack.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;


import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class PdfServiceImpl implements PdfService {

    private final InvoiceService invoiceService;

    @Override
    public byte[] generateInvoice(Long invoiceId) throws IOException {

        Invoice invoice = invoiceService.getInvoice(invoiceId);

        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page); //Page ko PDF me add kiya

        PDPageContentStream content = new PDPageContentStream(document, page);

        // ==========================================
        // Title
        // ==========================================

        content.setFont(PDType1Font.HELVETICA_BOLD, 18);
        writeLine(content, "AquaTrack Water Invoice", 170, 750);

        content.setFont(PDType1Font.HELVETICA, 12);

        float y = 710;

        // =========================
        // Invoice Details
        // =========================

        writeLine(content, "Invoice ID : " + invoice.getId(), 50, y);
        y -= 20;

        writeLine(content, "Created At : " + invoice.getCreatedAt(), 50, y);
        y -= 20;

        writeLine(content, "Payment Status : " + (invoice.getPaid() ? "PAID" : "UNPAID"), 50, y);
        y -= 40;

        // =========================
        // Household Details
        // =========================

        writeLine(content, "Apartment : " + invoice.getHousehold().getApartment().getApartmentName(), 50, y);
        y -= 20;

        writeLine(content, "Floor : " + invoice.getHousehold().getFloor().getFloorNumber(), 50, y);
        y -= 20;

        writeLine(content, "House Number : " + invoice.getHousehold().getHouseNumber(), 50, y);
        y -= 20;

        writeLine(content, "Meter Number : " + invoice.getHousehold().getMeterNumber(), 50, y);
        y -= 20;

        writeLine(content, "House Status : " + invoice.getHousehold().getStatus(), 50, y);

        // =========================
        // Billing Cycle
        // =========================

        y -= 40;

        writeLine(content, "Billing Cycle : " + invoice.getBillingCycle().getCycleName(), 50, y);
        y -= 20;

        writeLine(content, "Start Date : " + invoice.getBillingCycle().getStartDate(), 50, y);
        y -= 20;

        writeLine(content, "End Date : " + invoice.getBillingCycle().getEndDate(), 50, y);
        y -= 20;

        writeLine(content, "Due Date : " + invoice.getBillingCycle().getDueDate(), 50, y);

        // =========================
        // Charges
        // =========================

        y -= 40;

        writeLine(content, "Consumption : " + invoice.getConsumption() + " KL", 50, y);
        y -= 20;

        writeLine(content, "Base Charge : Rs. " + invoice.getBaseCharge(), 50, y);
        y -= 20;

        writeLine(content, "Shared Allocation : Rs. " + invoice.getSharedAllocation(), 50, y);
        y -= 20;

        writeLine(content, "Adjustments : Rs. " + invoice.getAdjustments(), 50, y);
        y -= 20;

        writeLine(content, "Total Amount : Rs. " + invoice.getTotalAmount(), 50, y);

        // =========================
        // Footer
        // =========================

        y -= 40;

        writeLine(content, "Please pay before the due date.", 50, y);
        y -= 20;

        writeLine(content, "Thank you for using AquaTrack.", 50, y);

        content.close();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        document.save(outputStream);
        document.close();

        return outputStream.toByteArray();
    }

    private void writeLine(
            PDPageContentStream content,
            String text,
            float x,
            float y
    ) throws IOException {

        content.beginText();

        content.setFont(PDType1Font.HELVETICA, 12);

        content.newLineAtOffset(x, y);

        content.showText(text);

        content.endText();

    }
}