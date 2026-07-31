package com.aquatrack.pdf;

import com.aquatrack.entity.WaterBill;
import org.springframework.core.io.Resource;

public interface InvoicePdfService {

    // ==========================================
    // Generate Water Bill Invoice PDF
    // ==========================================

    Resource generateInvoice(
            WaterBill waterBill
    );

}