package com.aquatrack.dto.propertyregistration;

import com.aquatrack.enums.PropertyType;
import com.aquatrack.enums.RegistrationStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyRegistrationSummaryResponse {

    private Long id;

    private String companyName;

    private String contactPersonName;

    private String email;

    private PropertyType propertyType;

    private Integer numberOfApartments;

    private String city;

    private String state;

    private RegistrationStatus status;

}