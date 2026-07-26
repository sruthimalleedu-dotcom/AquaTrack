package com.aquatrack.dto.alert;

import com.aquatrack.enums.AlertPriority;
import lombok.Data;

@Data
public class AlertSummaryResponseDto {

    private Long id;

    private String title;

    private AlertPriority priority;

    private boolean read;
}