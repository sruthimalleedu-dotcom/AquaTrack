package com.aquatrack_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO used to send water usage details
 * to the frontend.
 *
 * Only required fields are exposed.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WaterUsageDTO {

    // Date on which meter reading was recorded
    private LocalDate readingDate;

    // Water meter reading value
    private Double readingValue;

    // Reading source (MANUAL / CSV)
    private String source;
}