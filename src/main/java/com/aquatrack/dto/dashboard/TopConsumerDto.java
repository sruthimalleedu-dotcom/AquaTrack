
package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Response DTO for Top Water Consumers.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopConsumerDto {

    /**
     * Household number.
     */
    private String houseNumber;

    /**
     * Building name.
     */
    private String buildingName;

    /**
     * Total water consumed.
     */
    private BigDecimal totalConsumption;

}