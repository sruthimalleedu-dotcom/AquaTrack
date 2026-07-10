package com.aquatrack_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO used to send resident profile information
 * from the backend to the client.
 *
 * DTO (Data Transfer Object) prevents exposing
 * the complete database entity to the frontend.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResidentProfileDTO {

    // Resident's full name
    private String fullName;

    // Registered email (unique identifier)
    private String email;

    // Contact number
    private String phone;

    // Apartment building/block name
    private String buildingName;

    // Apartment/Flat number
    private String apartmentNumber;
}