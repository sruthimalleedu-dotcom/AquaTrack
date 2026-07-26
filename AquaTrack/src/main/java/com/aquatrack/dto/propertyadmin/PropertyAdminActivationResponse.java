package com.aquatrack.dto.propertyadmin;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PropertyAdminActivationResponse {

    private String firstName;

    private String lastName;

    private String email;

    private String token;

    private boolean tokenValid;

}
