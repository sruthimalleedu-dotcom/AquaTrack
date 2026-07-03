package com.aquatrack.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HouseholdDTO {

    private Long id;

    private String flatNumber;

    private Double flatSize;

    private Integer occupancy;

    private Long apartmentId;
}