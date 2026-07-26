package com.aquatrack.dto.propertyadminmanagement;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PropertyAdminSummaryResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private boolean active;

}