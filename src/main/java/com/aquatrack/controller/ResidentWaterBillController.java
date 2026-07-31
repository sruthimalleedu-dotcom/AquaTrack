package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.resident.ResidentWaterBillResponseDto;
import com.aquatrack.service.ResidentWaterBillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resident")
public class ResidentWaterBillController {

    // ==========================================
    // Services
    // ==========================================

    private final ResidentWaterBillService residentWaterBillService;

    // ==========================================
    // Get My Water Bills
    // ==========================================

    @GetMapping("/water-bills")
    public ApiResponse<List<ResidentWaterBillResponseDto>> getMyWaterBills() {

        return ApiResponse.success(

                "Water bills retrieved successfully.",

                residentWaterBillService.getMyWaterBills()

        );

    }

}
