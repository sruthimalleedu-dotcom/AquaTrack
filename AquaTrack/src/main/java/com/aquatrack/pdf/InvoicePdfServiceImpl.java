package com.aquatrack.pdf;

import com.aquatrack.entity.WaterBill;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.awt.Color;

@Service
@RequiredArgsConstructor
public class InvoicePdfServiceImpl implements InvoicePdfService {

    // ==========================================
    // Fonts
    // ==========================================

    private static final Font TITLE_FONT =
            FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    22,
                    new Color(33, 150, 243)
            );

    private static final Font SUBTITLE_FONT =
            FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    13
            );

    private static final Font HEADER_FONT =
            FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    11,
                    Color.WHITE
            );

    private static final Font LABEL_FONT =
            FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    10
            );

    private static final Font VALUE_FONT =
            FontFactory.getFont(
                    FontFactory.HELVETICA,
                    10
            );

    private static final Font TOTAL_FONT =
            FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    14
            );

    // ==========================================
    // Generate Invoice
    // ==========================================

    @Override
    public Resource generateInvoice(
            WaterBill waterBill
    ) {

        try {

            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            Document document =
                    new Document(PageSize.A4);

            PdfWriter.getInstance(
                    document,
                    outputStream
            );

            document.open();

            // ==========================================
// Title
// ==========================================

            addTitle(document);

// ==========================================
// Invoice Information
// ==========================================

            addSectionHeading(
                    document,
                    "Invoice Information"
            );

            addInformationTable(

                    document,

                    new String[][]{

                            {
                                    "Invoice No",
                                    waterBill.getInvoiceNumber()
                            },

                            {
                                    "Generated Date",
                                    waterBill.getGeneratedDate().toString()
                            },

                            {
                                    "Due Date",
                                    waterBill.getDueDate().toString()
                            },

                            {
                                    "Status",
                                    waterBill.getBillStatus().name()
                            }

                    }

            );

// ==========================================
// Resident Information
// ==========================================

            addSectionHeading(
                    document,
                    "Resident Information"
            );

            String residentName = waterBill.getHousehold()
                    .getUsers()
                    .stream()
                    .findFirst()
                    .map(user -> user.getFirstName()
                            + (user.getLastName() != null
                            ? " " + user.getLastName()
                            : ""))
                    .orElse("N/A");

            addInformationTable(

                    document,

                    new String[][]{

                            {
                                    "House Number",
                                    waterBill.getHousehold().getHouseNumber()
                            },

                            {
                                    "Resident",
                                    residentName
                            },

                            {
                                    "Building",
                                    waterBill.getHousehold()
                                            .getFloor()
                                            .getBuilding()
                                            .getBuildingName()
                            },

                            {
                                    "Billing Cycle",
                                    waterBill.getBillingCycle()
                                            .getCycleName()
                            }

                    }

            );

// ==========================================
// Water Consumption
// ==========================================

            addSectionHeading(
                    document,
                    "Water Consumption"
            );

            addInformationTable(

                    document,

                    new String[][]{

                            {
                                    "Consumption",
                                    waterBill.getConsumptionKL() + " KL"
                            },

                            {
                                    "Usage Percentage",
                                    waterBill.getUsagePercentage() + " %"
                            },

                            {
                                    "Cost Per KL",
                                    "₹ " + waterBill.getCostPerKL()
                            }

                    }

            );

// ==========================================
// Charges
// ==========================================

            addSectionHeading(
                    document,
                    "Charges Breakdown"
            );

            addInformationTable(

                    document,

                    new String[][]{

                            {
                                    "Shared Water Cost",
                                    "₹ " + waterBill.getSharedWaterCost()
                            },

                            {
                                    "Tariff Charge",
                                    "₹ " + waterBill.getTariffCharge()
                            },

                            {
                                    "Adjustment",
                                    "₹ " + waterBill.getAdjustmentAmount()
                            }

                    }

            );

// ==========================================
// Total
// ==========================================

            Paragraph total = new Paragraph(

                    "Total Amount : ₹ " + waterBill.getTotalAmount(),

                    TOTAL_FONT

            );

            total.setAlignment(Element.ALIGN_RIGHT);

            total.setSpacingBefore(20);

            document.add(total);

// ==========================================
// Footer
// ==========================================

            Paragraph footer = new Paragraph(

                    "\nThank you for using AquaTrack.\nGenerated electronically. No signature required.",

                    VALUE_FONT

            );

            footer.setAlignment(Element.ALIGN_CENTER);

            footer.setSpacingBefore(40);

            document.add(footer);

            document.close();

            return new ByteArrayResource(
                    outputStream.toByteArray()
            );

        } catch (Exception ex) {

            throw new RuntimeException(
                    "Failed to generate invoice PDF.",
                    ex
            );

        }

    }

    // ==========================================
// Title
// ==========================================

    private void addTitle(
            Document document
    ) throws Exception {

        Paragraph title = new Paragraph(
                "AquaTrack",
                TITLE_FONT
        );

        title.setAlignment(Element.ALIGN_CENTER);

        document.add(title);

        Paragraph subtitle = new Paragraph(
                "Enterprise Smart Apartment Water Management System",
                SUBTITLE_FONT
        );

        subtitle.setAlignment(Element.ALIGN_CENTER);

        subtitle.setSpacingAfter(20);

        document.add(subtitle);

    }

    // ==========================================
// Section Heading
// ==========================================

    private void addSectionHeading(

            Document document,

            String title

    ) throws Exception {

        PdfPTable table = new PdfPTable(1);

        table.setWidthPercentage(100);

        PdfPCell cell = new PdfPCell(
                new Phrase(title, HEADER_FONT)
        );

        cell.setBackgroundColor(
                new Color(33, 150, 243)
        );

        cell.setPadding(8);

        cell.setHorizontalAlignment(
                Element.ALIGN_CENTER
        );

        table.addCell(cell);

        table.setSpacingBefore(15);

        table.setSpacingAfter(10);

        document.add(table);

    }

    // ==========================================
// Detail Row
// ==========================================

    private PdfPCell createLabelCell(
            String value
    ) {

        PdfPCell cell = new PdfPCell(
                new Phrase(value, LABEL_FONT)
        );

        cell.setBorder(Rectangle.NO_BORDER);

        cell.setPadding(6);

        return cell;

    }

    private PdfPCell createValueCell(
            String value
    ) {

        PdfPCell cell = new PdfPCell(
                new Phrase(value, VALUE_FONT)
        );

        cell.setBorder(Rectangle.NO_BORDER);

        cell.setPadding(6);

        return cell;

    }

    // ==========================================
// Information Table
// ==========================================

    private void addInformationTable(

            Document document,

            String[][] rows

    ) throws Exception {

        PdfPTable table = new PdfPTable(2);

        table.setWidthPercentage(100);

        table.setWidths(
                new float[]{30f, 70f}
        );

        for (String[] row : rows) {

            table.addCell(
                    createLabelCell(row[0])
            );

            table.addCell(
                    createValueCell(row[1])
            );

        }

        document.add(table);

    }

}