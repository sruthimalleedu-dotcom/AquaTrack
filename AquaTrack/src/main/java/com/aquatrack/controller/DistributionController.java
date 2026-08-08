package com.aquatrack.controller.manager;

import com.aquatrack.dto.distribution.DistributionSummaryResponseDto;
import com.aquatrack.dto.distribution.GenerateDistributionRequestDto;
import com.aquatrack.service.DistributionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manager/distribution")
@RequiredArgsConstructor
public class DistributionController {

    // ==========================================
    // Service
    // ==========================================

    private final DistributionService distributionService;

    // ==========================================
    // Generate Consumption Distribution
    // ==========================================

    @PostMapping("/generate")
    public ResponseEntity<DistributionSummaryResponseDto> generateDistribution(

            @Valid
            @RequestBody GenerateDistributionRequestDto request

    ) {

        return ResponseEntity.ok(

                distributionService.generateDistribution(request)

        );

    }

}