package com.aquatrack.service;

import com.aquatrack.dto.distribution.DistributionSummaryResponseDto;
import com.aquatrack.dto.distribution.GenerateDistributionRequestDto;

public interface DistributionService {

    /**
     * Generates the complete water consumption distribution for a building
     * within a billing cycle.
     *
     * Includes:
     * - Building Water Summary
     * - Purchase Information
     * - Usage Analytics
     * - Household-wise Distribution
     *
     * @param request Distribution generation request
     * @return Distribution summary with household details
     */
    DistributionSummaryResponseDto generateDistribution(
            GenerateDistributionRequestDto request
    );

}