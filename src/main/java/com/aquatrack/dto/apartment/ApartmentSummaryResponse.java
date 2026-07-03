package com.aquatrack.dto.apartment;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApartmentSummaryResponse {

    // ==========================================
    // Apartment Summary
    // ==========================================

    private Long id;

    private String apartmentName;

    private String city;

    private String state;

    private Integer totalHouseholds;

}