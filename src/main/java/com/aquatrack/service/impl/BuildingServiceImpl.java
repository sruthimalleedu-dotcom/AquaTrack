package com.aquatrack.service.impl;

import com.aquatrack.dto.building.BuildingRequestDto;
import com.aquatrack.dto.building.BuildingResponseDto;
import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.Building;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.BuildingMapper;
import com.aquatrack.repository.ApartmentRepository;
import com.aquatrack.repository.BuildingRepository;
import com.aquatrack.service.BuildingService;
import com.aquatrack.entity.User;
import org.springframework.security.access.AccessDeniedException;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.entity.ManagerBuilding;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BuildingServiceImpl implements BuildingService {

    // ==========================
    // Dependencies
    // ==========================

    private final ApartmentRepository apartmentRepository;

    private final BuildingRepository buildingRepository;

    private final BuildingMapper buildingMapper;

    private final UserRepository userRepository;

    private final ManagerBuildingRepository managerBuildingRepository;

    // ==========================
    // Create Building
    // ==========================

    @Override
    public BuildingResponseDto createBuilding(Long apartmentId,
                                              BuildingRequestDto requestDto) {

        Apartment apartment = getOwnedApartment(apartmentId);

        String buildingName = requestDto.getBuildingName().trim();
        String buildingCode = requestDto.getBuildingCode().trim().toUpperCase();

        // Check duplicate building name
        if (buildingRepository.existsByApartmentIdAndBuildingNameIgnoreCase(
                apartmentId,
                buildingName)) {

            throw new DuplicateResourceException(
                    "Building name already exists in this apartment."
            );
        }

        // Check duplicate building code
        if (buildingRepository.existsByApartmentIdAndBuildingCodeIgnoreCase(
                apartmentId,
                buildingCode)) {

            throw new DuplicateResourceException(
                    "Building code already exists in this apartment."
            );
        }

        // Update normalized values
        requestDto.setBuildingName(buildingName);
        requestDto.setBuildingCode(buildingCode);

        // Convert DTO to Entity
        Building building = buildingMapper.toEntity(requestDto, apartment);

        // Save Building
        Building savedBuilding = buildingRepository.save(building);

        // Return Response
        return buildingMapper.toResponseDto(savedBuilding);
    }

    // ==========================
    // Get All Buildings
    // ==========================

    @Override
    @Transactional(readOnly = true)
    public List<BuildingResponseDto> getAllBuildings(Long apartmentId) {

        // Validate apartment exists
        getOwnedApartment(apartmentId);

        return buildingRepository.findByApartmentId(apartmentId)
                .stream()
                .map(buildingMapper::toResponseDto)
                .toList();
    }

    // ==========================
    // Get Building By ID
    // ==========================

    @Override
    @Transactional(readOnly = true)
    public BuildingResponseDto getBuildingById(Long apartmentId,
                                               Long buildingId) {

        Building building = getBuilding(apartmentId, buildingId);

        return buildingMapper.toResponseDto(building);
    }

    // ==========================
    // Update Building
    // ==========================

    @Override
    public BuildingResponseDto updateBuilding(Long apartmentId,
                                              Long buildingId,
                                              BuildingRequestDto requestDto) {

        // Fetch existing building
        Building building = getBuilding(apartmentId, buildingId);

        // Normalize values
        String buildingName = requestDto.getBuildingName().trim();
        String buildingCode = requestDto.getBuildingCode().trim().toUpperCase();

        // Check duplicate building name
        if (buildingRepository.existsByApartmentIdAndBuildingNameIgnoreCaseAndIdNot(
                apartmentId,
                buildingName,
                buildingId)) {

            throw new DuplicateResourceException(
                    "Building name already exists in this apartment."
            );
        }

        // Check duplicate building code
        if (buildingRepository.existsByApartmentIdAndBuildingCodeIgnoreCaseAndIdNot(
                apartmentId,
                buildingCode,
                buildingId)) {

            throw new DuplicateResourceException(
                    "Building code already exists in this apartment."
            );
        }

        // Update normalized values
        requestDto.setBuildingName(buildingName);
        requestDto.setBuildingCode(buildingCode);

        // Update entity
        buildingMapper.updateEntity(building, requestDto);

        // Save updated building
        Building updatedBuilding = buildingRepository.save(building);

        // Return response
        return buildingMapper.toResponseDto(updatedBuilding);
    }

    // ==========================
    // Delete Building
    // ==========================

    @Override
    public void deleteBuilding(Long apartmentId,
                               Long buildingId) {

        // Fetch building
        Building building = getBuilding(apartmentId, buildingId);

        // Delete building
        buildingRepository.delete(building);
    }

    // ==========================
// Manager Buildings
// ==========================

    @Override
    @Transactional(readOnly = true)
    public List<BuildingResponseDto> getManagerBuildings() {

        User manager = getCurrentUser();

        return managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .map(buildingMapper::toResponseDto)
                .toList();

    }

    // ==========================
    // Helper Methods
    // ==========================

    /**
     * Returns the apartment only if it belongs to the
     * currently logged-in Property Admin.
     *
     * @param apartmentId Apartment ID
     * @return Apartment entity
     */
    private Apartment getOwnedApartment(Long apartmentId) {

        // Get logged-in user's email
        User propertyAdmin = getCurrentUser();

        // Fetch apartment
        Apartment apartment = apartmentRepository.findById(apartmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Apartment not found with ID: " + apartmentId
                        ));

        // Verify apartment ownership
        if (apartment.getPropertyAdmin() == null
                || !apartment.getPropertyAdmin().getId().equals(propertyAdmin.getId())) {

            throw new AccessDeniedException(
                    "You are not authorized to manage this apartment."
            );
        }

        return apartment;
    }
    /**
     * Returns building by Apartment ID and Building ID.
     *
     * @param apartmentId Apartment ID
     * @param buildingId Building ID
     * @return Building entity
     */
    private Building getBuilding(Long apartmentId,
                                 Long buildingId) {

        // Validate ownership first
        getOwnedApartment(apartmentId);

        return buildingRepository.findByIdAndApartmentId(
                        buildingId,
                        apartmentId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Building not found with ID: " + buildingId
                        ));
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

}