package com.aquatrack.mapper;

import com.aquatrack.dto.alert.*;
import com.aquatrack.entity.Alert;
import com.aquatrack.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AlertMapper {

    public Alert toEntity(AlertRequestDto dto, User user) {

        return Alert.builder()
                .title(dto.getTitle())
                .message(dto.getMessage())
                .priority(dto.getPriority())
                .user(user)
                .build();
    }

    public AlertResponseDto toResponseDto(Alert alert) {

        AlertResponseDto dto = new AlertResponseDto();

        dto.setId(alert.getId());
        dto.setTitle(alert.getTitle());
        dto.setMessage(alert.getMessage());
        dto.setPriority(alert.getPriority());
        dto.setRead(alert.isRead());
        dto.setCreatedAt(alert.getCreatedAt());

        return dto;
    }

    public AlertSummaryResponseDto toSummaryDto(Alert alert) {

        AlertSummaryResponseDto dto = new AlertSummaryResponseDto();

        dto.setId(alert.getId());
        dto.setTitle(alert.getTitle());
        dto.setPriority(alert.getPriority());
        dto.setRead(alert.isRead());

        return dto;
    }
}