package com.aquatrack_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequestDTO {

    private String fullName;
    private String email;
    private String phone;
    private String buildingName;
    private String apartmentNumber;
}