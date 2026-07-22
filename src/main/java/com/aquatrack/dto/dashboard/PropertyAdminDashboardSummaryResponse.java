package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyAdminDashboardSummaryResponse {

    private Long totalApartments;

    private Long totalBuildings;

    private Long totalHouseholds;

    private Long totalManagers;

    private Long totalResidents;

}
