package com.aquatrack.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TariffPlanDTO {

    private Long id;

    private Double baseRate;

    private Double baseTierLimit;

    private Double excessRate;

    private Long apartmentId;
}