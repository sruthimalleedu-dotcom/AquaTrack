package com.aquatrack.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaterUsageLogDTO {

    private Long id;

    private LocalDate readingDate;

    private Double readingValue;

    private String source;

    private Long householdId;
}