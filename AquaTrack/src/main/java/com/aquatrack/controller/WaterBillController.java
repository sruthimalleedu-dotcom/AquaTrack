package com.aquatrack.controller;

import com.aquatrack.dto.bills.GenerateBillsRequestDto;
import com.aquatrack.dto.bills.UpdateBillStatusRequestDto;
import com.aquatrack.dto.bills.WaterBillResponseDto;
import com.aquatrack.dto.bills.WaterBillSummaryResponseDto;
import com.aquatrack.service.WaterBillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manager/water-bills")
@RequiredArgsConstructor
public class WaterBillController {

    // ==========================================
    // Service
    // ==========================================

    private final WaterBillService waterBillService;

    // ==========================================
    // Generate Bills
    // ==========================================

    @PostMapping("/generate")
    public ResponseEntity<WaterBillSummaryResponseDto> generateBills(
            @Valid @RequestBody GenerateBillsRequestDto request
    ) {

        return ResponseEntity.ok(
                waterBillService.generateBills(request)
        );

    }

    // ==========================================
    // Get Bills
    // ==========================================

    @GetMapping
    public ResponseEntity<WaterBillSummaryResponseDto> getBills(

            @RequestParam Long buildingId,

            @RequestParam Long billingCycleId

    ) {

        return ResponseEntity.ok(
                waterBillService.getBills(
                        buildingId,
                        billingCycleId
                )
        );

    }

    // ==========================================
    // Get Bill By ID
    // ==========================================

    @GetMapping("/{billId}")
    public ResponseEntity<WaterBillResponseDto> getBillById(

            @PathVariable Long billId

    ) {

        return ResponseEntity.ok(
                waterBillService.getBillById(billId)
        );

    }

    // ==========================================
    // Update Bill Status
    // ==========================================

    @PutMapping("/{billId}/status")
    public ResponseEntity<WaterBillResponseDto> updateBillStatus(

            @PathVariable Long billId,

            @Valid @RequestBody UpdateBillStatusRequestDto request

    ) {

        return ResponseEntity.ok(
                waterBillService.updateBillStatus(
                        billId,
                        request
                )
        );

    }

    // ==========================================
    // Download Invoice PDF
    // ==========================================

    @GetMapping("/{billId}/invoice")
    public ResponseEntity<Resource> downloadInvoice(

            @PathVariable Long billId

    ) {

        Resource resource = waterBillService.downloadInvoice(
                billId
        );

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=WaterBill-" + billId + ".pdf"
                )

                .contentType(MediaType.APPLICATION_PDF)

                .body(resource);

    }

}