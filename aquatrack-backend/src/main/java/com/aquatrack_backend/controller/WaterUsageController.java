package com.aquatrack_backend.controller;

import com.aquatrack_backend.dto.WaterUsageDTO;
import com.aquatrack_backend.service.WaterUsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller responsible for
 * resident water usage APIs.
 */
@RestController
@RequestMapping("/api/resident")
@RequiredArgsConstructor
public class WaterUsageController {

    // Service containing business logic
    private final WaterUsageService waterUsageService;

    /**
     * Returns all water usage records
     * for a resident.
     *
     * Example:
     * GET /api/resident/water-usage/nivida
     */
    @GetMapping("/water-usage/{username}")
    public List<WaterUsageDTO> getWaterUsage(

            // Username received from URL
            @PathVariable String username) {

        // Fetch and return water usage
        return waterUsageService.getWaterUsage(username);
    }
}