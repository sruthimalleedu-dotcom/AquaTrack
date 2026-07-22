package com.aquatrack.dto.floor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * Request DTO for creating and updating a floor.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class FloorRequestDto {

    // ==========================
    // Floor Information
    // ==========================

    @NotBlank(message = "Floor name is required.")
    @Size(max = 100, message = "Floor name cannot exceed 100 characters.")
    private String floorName;

    @NotNull(message = "Floor number is required.")
    @PositiveOrZero(message = "Floor number cannot be negative.")
    private Integer floorNumber;

}