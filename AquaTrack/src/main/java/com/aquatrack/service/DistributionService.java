package com.aquatrack.service;

import com.aquatrack.dto.distribution.DistributionResponseDto;

import java.util.List;

public interface DistributionService {

    List<DistributionResponseDto> getConsumptionDistribution(
            Long buildingId,
            Long billingCycleId
    );

}
