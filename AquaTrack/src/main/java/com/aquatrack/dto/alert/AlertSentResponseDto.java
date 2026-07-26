package com.aquatrack.dto.alert;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AlertSentResponseDto {

    private String message;

    private int totalAlertsSent;

}