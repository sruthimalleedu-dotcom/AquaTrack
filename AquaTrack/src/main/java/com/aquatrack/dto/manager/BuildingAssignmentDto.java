package com.aquatrack.dto.manager;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingAssignmentDto {

    private Long id;

    private String buildingName;

    private String buildingCode;

}