package com.aquatrack.service;

import com.aquatrack.dto.floor.FloorRequestDto;
import com.aquatrack.dto.floor.FloorResponseDto;

import java.util.List;

/**
 * Service interface for Floor management.
 */
public interface FloorService {

    /**
     * Creates a new floor for a building.
     *
     * @param buildingId Building ID
     * @param requestDto Floor request data
     * @return Created floor details
     */
    FloorResponseDto createFloor(Long buildingId,
                                 FloorRequestDto requestDto);

    /**
     * Returns all floors of a building.
     *
     * @param buildingId Building ID
     * @return List of floors
     */
    List<FloorResponseDto> getAllFloors(Long buildingId);

    /**
     * Returns floor details.
     *
     * @param buildingId Building ID
     * @param floorId Floor ID
     * @return Floor details
     */
    FloorResponseDto getFloorById(Long buildingId,
                                  Long floorId);

    /**
     * Updates floor details.
     *
     * @param buildingId Building ID
     * @param floorId Floor ID
     * @param requestDto Updated floor data
     * @return Updated floor details
     */
    FloorResponseDto updateFloor(Long buildingId,
                                 Long floorId,
                                 FloorRequestDto requestDto);

    /**
     * Deletes a floor.
     *
     * @param buildingId Building ID
     * @param floorId Floor ID
     */
    void deleteFloor(Long buildingId,
                     Long floorId);

    /**
     * Returns all floors of a building assigned to the
     * currently logged-in Manager.
     *
     * Access is granted only if the manager is assigned
     * to the specified building.
     *
     * @param buildingId Building ID
     * @return List of assigned floors
     */
    List<FloorResponseDto> getManagerFloors(Long buildingId);

}