package com.aquatrack.mapper;

import com.aquatrack.dto.building.BuildingRequestDto;
import com.aquatrack.dto.building.BuildingResponseDto;
import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.Building;
import org.springframework.stereotype.Component;

/**
 * Mapper class for converting Building Entity and DTOs.
 */
@Component
public class BuildingMapper {

    /**
     * Converts BuildingRequestDto to Building entity.
     *
     * @param requestDto  Building request DTO
     * @param apartment   Apartment entity
     * @return Building entity
     */
    public Building toEntity(BuildingRequestDto requestDto, Apartment apartment) {

        return Building.builder()
                .buildingName(requestDto.getBuildingName())
                .buildingCode(requestDto.getBuildingCode())
                .buildingType(requestDto.getBuildingType())
                .numberOfFloors(requestDto.getNumberOfFloors())
                .numberOfUnits(requestDto.getNumberOfUnits())
                .description(requestDto.getDescription())
                .apartment(apartment)
                .build();
    }

    /**
     * Updates an existing Building entity.
     *
     * @param building    Existing building
     * @param requestDto  Updated request DTO
     */
    public void updateEntity(Building building, BuildingRequestDto requestDto) {

        building.setBuildingName(requestDto.getBuildingName());
        building.setBuildingCode(requestDto.getBuildingCode());
        building.setBuildingType(requestDto.getBuildingType());
        building.setNumberOfFloors(requestDto.getNumberOfFloors());
        building.setNumberOfUnits(requestDto.getNumberOfUnits());
        building.setDescription(requestDto.getDescription());
    }

    /**
     * Converts Building entity to BuildingResponseDto.
     *
     * @param building Building entity
     * @return Building response DTO
     */
    public BuildingResponseDto toResponseDto(Building building) {

        return BuildingResponseDto.builder()
                .id(building.getId())
                .buildingName(building.getBuildingName())
                .buildingCode(building.getBuildingCode())
                .buildingType(building.getBuildingType())
                .numberOfFloors(building.getNumberOfFloors())
                .numberOfUnits(building.getNumberOfUnits())
                .description(building.getDescription())
                .apartmentId(building.getApartment().getId())
                .apartmentName(building.getApartment().getApartmentName())
                .createdAt(building.getCreatedAt())
                .updatedAt(building.getUpdatedAt())
                .build();
    }

}