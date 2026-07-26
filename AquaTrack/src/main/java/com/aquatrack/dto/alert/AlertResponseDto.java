package com.aquatrack.dto.alert;

import com.aquatrack.enums.AlertPriority;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AlertResponseDto {

    private Long id;

    private String title;

    private String message;

    private AlertPriority priority;

    private boolean read;

    private LocalDateTime createdAt;
}