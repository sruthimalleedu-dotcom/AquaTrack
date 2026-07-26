package com.aquatrack.dto.propertyregistration;

import com.aquatrack.enums.PropertyType;
import com.aquatrack.enums.RegistrationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyRegistrationResponse {

    private Long id;

    private Long propertyAdminId;

    private String companyName;

    private String contactPersonName;

    private String email;

    private String phone;

    private PropertyType propertyType;

    private Integer numberOfApartments;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private RegistrationStatus status;

    private String remarks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}