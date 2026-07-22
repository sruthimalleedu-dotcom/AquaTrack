package com.aquatrack.dto.manager;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ManagerActivationDetailsResponseDto {

    // ==========================================
    // Manager Information
    // ==========================================

    private String firstName;

    private String lastName;

    private String email;

    // ==========================================
    // Apartment
    // ==========================================

    private String apartmentName;

    // ==========================================
    // Assigned Buildings
    // ==========================================

    private List<String> buildingNames;



}