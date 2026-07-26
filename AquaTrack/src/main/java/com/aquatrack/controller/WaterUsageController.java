package com.aquatrack.controller;

import com.aquatrack.dto.waterusage.CreateWaterUsageRequestDto;
import com.aquatrack.dto.waterusage.UpdateWaterUsageRequestDto;
import com.aquatrack.dto.waterusage.WaterUsageResponseDto;
import com.aquatrack.service.WaterUsageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager/households/{householdId}/water-usage")
@RequiredArgsConstructor
public class WaterUsageController {

    private final WaterUsageService waterUsageService;

    // ==========================================
    // Create Water Usage
    // ==========================================

    @PostMapping
    public ResponseEntity<WaterUsageResponseDto> createWaterUsage(
            @PathVariable Long householdId,
            @Valid @RequestBody CreateWaterUsageRequestDto requestDto
    ) {

        WaterUsageResponseDto response =
                waterUsageService.createWaterUsage(
                        householdId,
                        requestDto
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);

    }

    // ==========================================
    // Update Water Usage
    // ==========================================

    @PutMapping("/{waterUsageId}")
    public ResponseEntity<WaterUsageResponseDto> updateWaterUsage(
            @PathVariable Long householdId,
            @PathVariable Long waterUsageId,
            @Valid @RequestBody UpdateWaterUsageRequestDto requestDto
    ) {

        WaterUsageResponseDto response =
                waterUsageService.updateWaterUsage(
                        householdId,
                        waterUsageId,
                        requestDto
                );

        return ResponseEntity.ok(response);

    }

    // ==========================================
    // Get Water Usage By Id
    // ==========================================

    @GetMapping("/{waterUsageId}")
    public ResponseEntity<WaterUsageResponseDto> getWaterUsageById(
            @PathVariable Long householdId,
            @PathVariable Long waterUsageId
    ) {

        return ResponseEntity.ok(
                waterUsageService.getWaterUsageById(
                        householdId,
                        waterUsageId
                )
        );

    }

    // ==========================================
    // Get All Water Usage
    // ==========================================

    @GetMapping
    public ResponseEntity<List<WaterUsageResponseDto>> getAllWaterUsage(
            @PathVariable Long householdId
    ) {

        return ResponseEntity.ok(
                waterUsageService.getAllWaterUsage(
                        householdId
                )
        );

    }

    // ==========================================
    // Delete Water Usage
    // ==========================================

    @DeleteMapping("/{waterUsageId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWaterUsage(
            @PathVariable Long householdId,
            @PathVariable Long waterUsageId
    ) {

        waterUsageService.deleteWaterUsage(
                householdId,
                waterUsageId
        );

    }

}