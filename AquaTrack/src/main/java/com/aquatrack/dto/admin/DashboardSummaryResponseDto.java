package com.aquatrack.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Dashboard Summary Response DTO.
 *
 * Used by SUPER_ADMIN dashboard.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryResponseDto {

    private long totalRegistrations;

    private long pendingRegistrations;

    private long approvedRegistrations;

    private long rejectedRegistrations;

    private long totalPropertyAdmins;

    private long activePropertyAdmins;

    private long inactivePropertyAdmins;

}