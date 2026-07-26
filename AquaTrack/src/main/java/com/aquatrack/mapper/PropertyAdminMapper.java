package com.aquatrack.mapper;

import com.aquatrack.dto.propertyadminmanagement.PropertyAdminResponse;
import com.aquatrack.dto.propertyadminmanagement.PropertyAdminSummaryResponse;
import com.aquatrack.entity.User;
import org.springframework.stereotype.Component;

@Component
public class PropertyAdminMapper {

    // ==========================================
    // Entity -> Summary Response
    // ==========================================

    public PropertyAdminSummaryResponse toSummaryResponse(
            User user) {

        return PropertyAdminSummaryResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .active(Boolean.TRUE.equals(user.getIsActive()))
                .build();

    }

    // ==========================================
    // Entity -> Response
    // ==========================================

    public PropertyAdminResponse toResponse(
            User user) {

        return PropertyAdminResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .active(Boolean.TRUE.equals(user.getIsActive()))
                .build();

    }

}