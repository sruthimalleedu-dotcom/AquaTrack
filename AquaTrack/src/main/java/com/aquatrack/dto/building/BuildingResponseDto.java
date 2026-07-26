package com.aquatrack.dto.building;

import com.aquatrack.enums.BuildingType;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Response DTO for building details.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class BuildingResponseDto {

    // ==========================
    // Building Information
    // ==========================

    private Long id;

    private String buildingName;

    private String buildingCode;

    private BuildingType buildingType;

    private Integer numberOfFloors;

    private Integer numberOfUnits;

    private String description;

    // ==========================
    // Apartment Information
    // ==========================

    private Long apartmentId;

    private String apartmentName;

    // ==========================
    // Audit Information
    // ==========================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}