package com.aquatrack.dto.apartment;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApartmentResponse {

    // ==========================================
    // Apartment Information
    // ==========================================

    private Long id;

    private String apartmentName;

    private String addressLine1;

    private String addressLine2;

    private String city;

    private String state;

    private String pincode;

    // ==========================================
    // Statistics
    // ==========================================

    private Integer totalHouseholds;

    // ==========================================
    // Audit Information
    // ==========================================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}