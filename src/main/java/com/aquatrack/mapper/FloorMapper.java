package com.aquatrack.mapper;

import com.aquatrack.dto.floor.FloorRequestDto;
import com.aquatrack.dto.floor.FloorResponseDto;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Floor;
import org.springframework.stereotype.Component;

/**
 * Mapper class for converting Floor Entity and DTOs.
 */
@Component
public class FloorMapper {

    /**
     * Converts FloorRequestDto to Floor entity.
     *
     * @param requestDto Floor request DTO
     * @param building   Building entity
     * @return Floor entity
     */
    public Floor toEntity(FloorRequestDto requestDto, Building building) {

        return Floor.builder()
                .floorName(requestDto.getFloorName())
                .floorNumber(requestDto.getFloorNumber())
                .building(building)
                .build();
    }

    /**
     * Updates an existing Floor entity.
     *
     * @param floor Existing floor
     * @param requestDto Updated request DTO
     */
    public void updateEntity(Floor floor, FloorRequestDto requestDto) {

        floor.setFloorName(requestDto.getFloorName());
        floor.setFloorNumber(requestDto.getFloorNumber());
    }

    /**
     * Converts Floor entity to FloorResponseDto.
     *
     * @param floor Floor entity
     * @return Floor response DTO
     */
    public FloorResponseDto toResponseDto(Floor floor) {

        return FloorResponseDto.builder()
                .id(floor.getId())
                .floorName(floor.getFloorName())
                .floorNumber(floor.getFloorNumber())
                .buildingId(floor.getBuilding().getId())
                .buildingName(floor.getBuilding().getBuildingName())
                .buildingCode(floor.getBuilding().getBuildingCode())
                .createdAt(floor.getCreatedAt())
                .updatedAt(floor.getUpdatedAt())
                .build();
    }

}