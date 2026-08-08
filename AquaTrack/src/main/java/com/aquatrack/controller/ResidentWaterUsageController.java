package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.resident.ResidentWaterUsageResponseDto;
import com.aquatrack.service.ResidentWaterUsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resident")
@RequiredArgsConstructor
@PreAuthorize("hasRole('RESIDENT')")
public class ResidentWaterUsageController {

    private final ResidentWaterUsageService residentWaterUsageService;

    // ==========================================
    // My Water Usage
    // ==========================================

    /**
     * Returns the water usage history of the
     * currently logged-in resident.
     *
     * @return Water usage history
     */
    @GetMapping("/water-usage")
    public ResponseEntity<ApiResponse<List<ResidentWaterUsageResponseDto>>> getMyWaterUsage() {

        List<ResidentWaterUsageResponseDto> response =
                residentWaterUsageService.getMyWaterUsage();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Water usage history retrieved successfully.",
                        response
                )
        );

    }

}