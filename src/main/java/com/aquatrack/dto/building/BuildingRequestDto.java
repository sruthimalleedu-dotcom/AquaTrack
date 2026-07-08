package com.aquatrack.dto.building;

import com.aquatrack.enums.BuildingType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * Request DTO for creating and updating a building.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class BuildingRequestDto {

    // ==========================
    // Building Information
    // ==========================

    @NotBlank(message = "Building name is required.")
    @Size(max = 100, message = "Building name cannot exceed 100 characters.")
    private String buildingName;

    @NotBlank(message = "Building code is required.")
    @Size(max = 20, message = "Building code cannot exceed 20 characters.")
    private String buildingCode;

    @NotNull(message = "Building type is required.")
    private BuildingType buildingType;

    @NotNull(message = "Number of floors is required.")
    @Positive(message = "Number of floors must be greater than zero.")
    private Integer numberOfFloors;

    @NotNull(message = "Number of units is required.")
    @PositiveOrZero(message = "Number of units cannot be negative.")
    private Integer numberOfUnits;

    @Size(max = 500, message = "Description cannot exceed 500 characters.")
    private String description;

}
