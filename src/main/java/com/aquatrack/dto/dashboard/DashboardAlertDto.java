package com.aquatrack.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Response DTO for Dashboard Alerts.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardAlertDto {

    /**
     * Alert title.
     */
    private String title;

    /**
     * Alert description.
     */
    private String message;

    /**
     * Severity.
     * INFO
     * WARNING
     * CRITICAL
     */
    private String severity;

}