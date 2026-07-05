package com.aquatrack.dto.propertyadminmanagement;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PropertyAdminResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String role;

    private boolean active;

}