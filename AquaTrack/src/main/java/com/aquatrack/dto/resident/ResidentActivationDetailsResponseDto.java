package com.aquatrack.dto.resident;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResidentActivationDetailsResponseDto {

    private String firstName;

    private String lastName;

    private String email;

    private String apartmentName;

    private String buildingName;

    private String householdNumber;

}