package com.aquatrack.dto.floor;

import lombok.*;

import java.time.LocalDateTime;

/**
 * Response DTO for floor details.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class FloorResponseDto {

    // ==========================
    // Floor Information
    // ==========================

    private Long id;

    private String floorName;

    private Integer floorNumber;

    // ==========================
    // Building Information
    // ==========================

    private Long buildingId;

    private String buildingName;

    private String buildingCode;

    // ==========================
    // Audit Information
    // ==========================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}