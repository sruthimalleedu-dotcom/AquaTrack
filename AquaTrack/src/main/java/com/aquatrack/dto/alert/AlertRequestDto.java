package com.aquatrack.dto.alert;

import com.aquatrack.enums.AlertPriority;
import lombok.Data;

@Data
public class AlertRequestDto {

    private String title;

    private String message;

    private AlertPriority priority;

}