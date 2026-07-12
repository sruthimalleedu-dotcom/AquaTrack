package com.aquatrack.dto.propertyadmin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyAdminActivationInfoResponse {

    private String firstName;

    private String lastName;

    private String email;

    private String apartmentName;

    private boolean tokenValid;

}