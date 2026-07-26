package com.aquatrack.service;

import com.aquatrack.dto.building.BuildingRequestDto;
import com.aquatrack.dto.building.BuildingResponseDto;

import java.util.List;

/**
 * Service interface for Building management.
 */
public interface BuildingService {

    /**
     * Creates a new building for an apartment.
     *
     * @param apartmentId Apartment ID
     * @param requestDto Building request data
     * @return Created building details
     */
    BuildingResponseDto createBuilding(Long apartmentId,
                                       BuildingRequestDto requestDto);

    /**
     * Returns all buildings of an apartment.
     *
     * @param apartmentId Apartment ID
     * @return List of buildings
     */
    List<BuildingResponseDto> getAllBuildings(Long apartmentId);

    /**
     * Returns building details.
     *
     * @param apartmentId Apartment ID
     * @param buildingId Building ID
     * @return Building details
     */
    BuildingResponseDto getBuildingById(Long apartmentId,
                                        Long buildingId);

    /**
     * Updates building details.
     *
     * @param apartmentId Apartment ID
     * @param buildingId Building ID
     * @param requestDto Updated building data
     * @return Updated building details
     */
    BuildingResponseDto updateBuilding(Long apartmentId,
                                       Long buildingId,
                                       BuildingRequestDto requestDto);

    /**
     * Deletes a building.
     *
     * @param apartmentId Apartment ID
     * @param buildingId Building ID
     */
    void deleteBuilding(Long apartmentId,
                        Long buildingId);

    /**
     * Returns all buildings assigned to the logged-in manager.
     *
     * @return List of assigned buildings
     */
    List<BuildingResponseDto> getManagerBuildings();

}