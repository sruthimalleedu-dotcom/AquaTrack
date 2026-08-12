package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Building-wise water consumption.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingUsageDto {

    /**
     * Building name.
     */
    private String buildingName;

    /**
     * Total water consumption.
     */
    private BigDecimal totalConsumption;

}
