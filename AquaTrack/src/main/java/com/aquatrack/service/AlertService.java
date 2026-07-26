package com.aquatrack.service;

import com.aquatrack.dto.alert.AlertRequestDto;
import com.aquatrack.dto.alert.AlertResponseDto;
import com.aquatrack.dto.alert.AlertSentResponseDto;
import com.aquatrack.dto.alert.AlertSummaryResponseDto;
import java.util.List;

public interface AlertService {

    AlertSentResponseDto createAlert(AlertRequestDto requestDto); //Create a new alert

    List<AlertSummaryResponseDto> getMyAlerts(); //List alerts of logged-in user

    AlertResponseDto getAlertById(Long id); //View one alert

    AlertResponseDto markAsRead(Long alertId); //Mark alert as read

    long getUnreadAlertCount(); //Notification badge count

    void deleteAlert(Long alertId); //Delete an alert
}