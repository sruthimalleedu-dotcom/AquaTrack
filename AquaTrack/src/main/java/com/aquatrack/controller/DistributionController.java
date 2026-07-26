package com.aquatrack.controller.manager;

import com.aquatrack.dto.distribution.DistributionResponseDto;
import com.aquatrack.service.DistributionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager/distribution")
@RequiredArgsConstructor
public class DistributionController {

    // ==========================================
    // Service
    // ==========================================

    private final DistributionService distributionService;

    // ==========================================
    // Consumption Distribution
    // ==========================================

    @GetMapping("/{buildingId}/{billingCycleId}")
    public ResponseEntity<List<DistributionResponseDto>>
    getConsumptionDistribution(

            @PathVariable Long buildingId,

            @PathVariable Long billingCycleId

    ) {

        return ResponseEntity.ok(

                distributionService.getConsumptionDistribution(
                        buildingId,
                        billingCycleId
                )

        );

    }

}