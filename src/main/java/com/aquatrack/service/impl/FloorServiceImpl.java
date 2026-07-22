package com.aquatrack.service.impl;

import com.aquatrack.dto.floor.FloorRequestDto;
import com.aquatrack.dto.floor.FloorResponseDto;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Floor;
import com.aquatrack.entity.User;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.FloorMapper;
import com.aquatrack.repository.BuildingRepository;
import com.aquatrack.repository.FloorRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.FloorService;
import com.aquatrack.entity.ManagerBuilding;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.util.SecurityUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FloorServiceImpl implements FloorService {

    private final BuildingRepository buildingRepository;

    private final FloorRepository floorRepository;

    private final FloorMapper floorMapper;

    private final UserRepository userRepository;

    private final ManagerBuildingRepository managerBuildingRepository;

    // ==========================
// Create Floor
// ==========================

    @Override
    public FloorResponseDto createFloor(Long buildingId,
                                        FloorRequestDto requestDto) {

        Building building = getOwnedBuilding(buildingId);

        String floorName = requestDto.getFloorName().trim();
        Integer floorNumber = requestDto.getFloorNumber();

        // Check duplicate floor name
        if (floorRepository.existsByBuildingAndFloorName(
                building,
                floorName)) {

            throw new DuplicateResourceException(
                    "Floor name already exists in this building."
            );
        }

        // Check duplicate floor number
        if (floorRepository.existsByBuildingAndFloorNumber(
                building,
                floorNumber)) {

            throw new DuplicateResourceException(
                    "Floor number already exists in this building."
            );
        }

        // Update normalized values
        requestDto.setFloorName(floorName);

        // Convert DTO to Entity
        Floor floor = floorMapper.toEntity(requestDto, building);

        // Save Floor
        Floor savedFloor = floorRepository.save(floor);

        // Return Response
        return floorMapper.toResponseDto(savedFloor);
    }

    // ==========================
// Get All Floors
// ==========================

    @Override
    @Transactional(readOnly = true)
    public List<FloorResponseDto> getAllFloors(Long buildingId) {

        Building building = getOwnedBuilding(buildingId);

        return floorRepository.findByBuildingOrderByFloorNumberAsc(building)
                .stream()
                .map(floorMapper::toResponseDto)
                .toList();
    }

    // ==========================
// Get Manager Floors
// ==========================

    @Override
    @Transactional(readOnly = true)
    public List<FloorResponseDto> getManagerFloors(Long buildingId) {

        User manager = getCurrentUser();

        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Building not found with ID: " + buildingId
                        ));

        boolean assigned = managerBuildingRepository
                .existsByManagerAndBuilding(manager, building);

        if (!assigned) {

            throw new AccessDeniedException(
                    "You are not assigned to this building."
            );

        }

        return floorRepository
                .findByBuildingOrderByFloorNumberAsc(building)
                .stream()
                .map(floorMapper::toResponseDto)
                .toList();

    }

    // ==========================
// Get Floor By ID
// ==========================

    @Override
    @Transactional(readOnly = true)
    public FloorResponseDto getFloorById(Long buildingId,
                                         Long floorId) {

        Floor floor = getFloor(buildingId, floorId);

        return floorMapper.toResponseDto(floor);
    }

    // ==========================
// Update Floor
// ==========================

    @Override
    public FloorResponseDto updateFloor(Long buildingId,
                                        Long floorId,
                                        FloorRequestDto requestDto) {

        // Fetch existing floor
        Floor floor = getFloor(buildingId, floorId);

        // Normalize values
        String floorName = requestDto.getFloorName().trim();
        Integer floorNumber = requestDto.getFloorNumber();

        // Check duplicate floor name
        if (floorRepository.existsByBuildingAndFloorNameAndIdNot(
                floor.getBuilding(),
                floorName,
                floorId)) {

            throw new DuplicateResourceException(
                    "Floor name already exists in this building."
            );
        }

        // Check duplicate floor number
        if (floorRepository.existsByBuildingAndFloorNumberAndIdNot(
                floor.getBuilding(),
                floorNumber,
                floorId)) {

            throw new DuplicateResourceException(
                    "Floor number already exists in this building."
            );
        }

        // Update normalized values
        requestDto.setFloorName(floorName);

        // Update entity
        floorMapper.updateEntity(floor, requestDto);

        // Save updated floor
        Floor updatedFloor = floorRepository.save(floor);

        // Return response
        return floorMapper.toResponseDto(updatedFloor);
    }

    // ==========================
// Delete Floor
// ==========================

    @Override
    public void deleteFloor(Long buildingId,
                            Long floorId) {

        // Fetch floor
        Floor floor = getFloor(buildingId, floorId);

        // Delete floor
        floorRepository.delete(floor);
    }

    // ==========================
// Helper Methods
// ==========================

    /**
     * Returns the building only if it belongs to the
     * currently logged-in Property Admin.
     *
     * @param buildingId Building ID
     * @return Building entity
     */
    private Building getOwnedBuilding(Long buildingId) {

        User propertyAdmin = getCurrentUser();

        // Fetch building
        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Building not found with ID: " + buildingId
                        ));

        // Verify ownership through apartment
        if (building.getApartment() == null
                || building.getApartment().getPropertyAdmin() == null
                || !building.getApartment()
                .getPropertyAdmin()
                .getId()
                .equals(propertyAdmin.getId())) {

            throw new AccessDeniedException(
                    "You are not authorized to manage this building."
            );
        }

        return building;
    }

    /**
     * Returns the currently logged-in user.
     *
     * @return Logged-in user
     */
    private User getCurrentUser() {

        String email = SecurityUtil.getCurrentUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Logged-in user not found."
                        ));

    }
    /**
     * Returns floor by Building ID and Floor ID.
     *
     * @param buildingId Building ID
     * @param floorId Floor ID
     * @return Floor entity
     */
    private Floor getFloor(Long buildingId,
                           Long floorId) {

        // Validate ownership first
        getOwnedBuilding(buildingId);

        return floorRepository.findByIdAndBuildingId(
                        floorId,
                        buildingId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Floor not found with ID: " + floorId
                        ));
    }
}