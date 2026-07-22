package com.aquatrack.service.impl;

import com.aquatrack.dto.household.HouseholdRequest;
import com.aquatrack.dto.household.HouseholdResponse;
import com.aquatrack.entity.Floor;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.User;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.HouseholdMapper;
import com.aquatrack.repository.FloorRepository;
import com.aquatrack.repository.HouseholdRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.HouseholdService;
import com.aquatrack.util.SecurityUtil;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.enums.UserRole;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.ManagerBuilding;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HouseholdServiceImpl implements HouseholdService {

    private final HouseholdRepository householdRepository;

    private final FloorRepository floorRepository;

    private final HouseholdMapper householdMapper;

    private final UserRepository userRepository;

    private final ManagerBuildingRepository managerBuildingRepository;

    // ==========================================
    // Create Household
    // ==========================================

    @Override
    public HouseholdResponse createHousehold(
            Long floorId,
            HouseholdRequest request
    ) {

        Floor floor = getAssignedFloor(floorId);

        String houseNumber = request.getHouseNumber().trim();
        String meterNumber = request.getMeterNumber().trim();

        // Duplicate House Number
        if (householdRepository.existsByFloorAndHouseNumber(
                floor,
                houseNumber
        )) {

            throw new DuplicateResourceException(
                    "House number already exists on this floor."
            );

        }

        // Duplicate Meter Number
        if (householdRepository.existsByMeterNumber(
                meterNumber
        )) {

            throw new DuplicateResourceException(
                    "Meter number already exists."
            );

        }

        request.setHouseNumber(houseNumber);
        request.setMeterNumber(meterNumber);

        Household household = householdMapper.toEntity(
                request,
                floor
        );

        Household savedHousehold = householdRepository.save(
                household
        );

        return householdMapper.toResponseDto(
                savedHousehold,
                userRepository.countByHousehold(savedHousehold)
        );

    }

    // ==========================================
    // Get All Households
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<HouseholdResponse> getHouseholdsByFloor(
            Long floorId
    ) {

        Floor floor = getAssignedFloor(floorId);

        return householdRepository.findByFloor(floor)
                .stream()
                .map(household ->
                        householdMapper.toResponseDto(
                                household,
                                userRepository.countByHousehold(household)
                        )
                )
                .toList();

    }

    // ==========================================
    // Get Household By ID
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public HouseholdResponse getHouseholdById(
            Long floorId,
            Long householdId
    ) {

        Household household = getHousehold(
                floorId,
                householdId
        );

        return householdMapper.toResponseDto(
                household,
                userRepository.countByHousehold(household)
        );
    }

    // ==========================================
// Manager Households
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<HouseholdResponse> getManagerHouseholds() {

        User manager = getCurrentManager();

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(ManagerBuilding::getBuilding)
                .toList();

        return householdRepository.findByFloor_BuildingIn(buildings)
                .stream()
                .map(household -> householdMapper.toResponseDto(
                        household,
                        userRepository.countByHousehold(household)
                ))
                .toList();

    }

    // ==========================================
    // Update Household
    // ==========================================

    @Override
    public HouseholdResponse updateHousehold(
            Long floorId,
            Long householdId,
            HouseholdRequest request
    ) {

        Household household = getHousehold(
                floorId,
                householdId
        );

        String houseNumber = request.getHouseNumber().trim();
        String meterNumber = request.getMeterNumber().trim();

        // Check duplicate house number
        if (householdRepository.existsByFloorAndHouseNumberAndIdNot(
                household.getFloor(),
                houseNumber,
                householdId
        )) {

            throw new DuplicateResourceException(
                    "House number already exists on this floor."
            );

        }

        // Check duplicate meter number
        if (householdRepository.existsByMeterNumberAndIdNot(
                meterNumber,
                householdId
        )) {

            throw new DuplicateResourceException(
                    "Meter number already exists."
            );

        }

        request.setHouseNumber(houseNumber);
        request.setMeterNumber(meterNumber);

        householdMapper.updateEntity(
                household,
                request
        );

        Household updatedHousehold = householdRepository.save(
                household
        );

        return householdMapper.toResponseDto(
                updatedHousehold,
                userRepository.countByHousehold(updatedHousehold)
        );

    }

    // ==========================================
    // Delete Household
    // ==========================================

    @Override
    public void deleteHousehold(
            Long floorId,
            Long householdId
    ) {

        Household household = getHousehold(
                floorId,
                householdId
        );

        householdRepository.delete(
                household
        );

    }

    // ==========================================
    // Helper Methods
    // ==========================================

    /**
     * Returns the floor only if it belongs to a building
     * assigned to the currently logged-in Manager.
     *
     * @param floorId Floor ID
     * @return Floor entity
     */
    private Floor getAssignedFloor(Long floorId) {

        // Get logged-in user's email
        String email = SecurityUtil.getCurrentUserEmail();

        // Fetch logged-in Manager
        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Logged-in manager not found."
                        ));

        // Extra safety check
        if (manager.getRole() != UserRole.MANAGER) {
            throw new AccessDeniedException(
                    "Only managers can access this resource."
            );
        }

        // Fetch floor
        Floor floor = floorRepository.findById(floorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Floor not found with ID: " + floorId
                        ));

        // Verify manager assignment
        if (!managerBuildingRepository.existsByManagerAndBuilding(
                manager,
                floor.getBuilding()
        )) {

            throw new AccessDeniedException(
                    "You are not assigned to this building."
            );

        }

        return floor;
    }

    /**
     * Returns household by Floor ID and Household ID.
     *
     * @param floorId Floor ID
     * @param householdId Household ID
     * @return Household entity
     */
    private Household getHousehold(
            Long floorId,
            Long householdId
    ) {

        // Validate ownership first
        Floor floor = getAssignedFloor(floorId);

        return householdRepository.findById(householdId)
                .filter(household ->
                        household.getFloor().getId().equals(floor.getId())
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Household not found with ID: " + householdId
                        ));

    }

    private User getCurrentManager() {

        String email = SecurityUtil.getCurrentUserEmail();

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Logged-in manager not found."
                        )
                );

        if (manager.getRole() != UserRole.MANAGER) {

            throw new AccessDeniedException(
                    "Only managers can access this resource."
            );

        }

        return manager;

    }

}