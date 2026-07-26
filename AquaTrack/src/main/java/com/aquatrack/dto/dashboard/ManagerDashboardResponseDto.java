package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Response DTO for Manager Dashboard.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ManagerDashboardResponseDto {

    /**
     * Total households managed by the logged-in manager.
     */
    private Long totalHouseholds;

    /**
     * Total residents living in those households.
     */
    private Long totalResidents;
}
