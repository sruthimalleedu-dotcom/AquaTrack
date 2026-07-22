package com.aquatrack.service.impl;

import com.aquatrack.dto.billingcycle.BillingCycleResponseDto;
import com.aquatrack.dto.billingcycle.CreateBillingCycleRequestDto;
import com.aquatrack.dto.billingcycle.UpdateBillingCycleRequestDto;
import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.User;
import com.aquatrack.enums.BillingStatus;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.BadRequestException;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.BillingCycleMapper;
import com.aquatrack.repository.BillingCycleRepository;
import com.aquatrack.repository.BuildingRepository;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.BillingCycleService;
import com.aquatrack.util.SecurityUtil;
import java.util.List;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BillingCycleServiceImpl implements BillingCycleService {

    private final BillingCycleRepository billingCycleRepository;

    private final BuildingRepository buildingRepository;

    private final UserRepository userRepository;

    private final ManagerBuildingRepository managerBuildingRepository;

    private final BillingCycleMapper billingCycleMapper;

    // ==========================================
    // Create Billing Cycle
    // ==========================================

    @Override
    public BillingCycleResponseDto createBillingCycle(
            CreateBillingCycleRequestDto request
    ) {

        Building building = getAssignedBuilding(
                request.getBuildingId()
        );

        validateBillingCycleDates(
                request.getStartDate(),
                request.getEndDate(),
                request.getDueDate()
        );

        if (billingCycleRepository.existsByBuildingAndCycleName(
                building,
                request.getCycleName().trim()
        )) {

            throw new DuplicateResourceException(
                    "Billing cycle already exists with name: "
                            + request.getCycleName()
            );

        }

        validateBillingCycleOverlap(
                building,
                request.getStartDate(),
                request.getEndDate()
        );

        BillingCycle billingCycle =
                billingCycleMapper.toEntity(request);

        billingCycle.setBuilding(building);

        billingCycle.setBillingStatus(
                BillingStatus.OPEN
        );

        BillingCycle savedBillingCycle =
                billingCycleRepository.save(
                        billingCycle
                );

        return billingCycleMapper.toResponseDto(
                savedBillingCycle
        );

    }

    // ==========================================
// Get All Billing Cycles
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<BillingCycleResponseDto> getAllBillingCycles() {

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

        return managerBuildingRepository.findByManager(manager)
                .stream()
                .map(managerBuilding ->
                        billingCycleRepository.findByBuilding(
                                managerBuilding.getBuilding()
                        )
                )
                .flatMap(List::stream)
                .map(billingCycleMapper::toResponseDto)
                .toList();

    }

    // ==========================================
// Get Billing Cycle By ID
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public BillingCycleResponseDto getBillingCycleById(
            Long billingCycleId
    ) {

        BillingCycle billingCycle = getBillingCycle(
                billingCycleId
        );

        getAssignedBuilding(
                billingCycle.getBuilding().getId()
        );

        return billingCycleMapper.toResponseDto(
                billingCycle
        );

    }

    // ==========================================
// Get Billing Cycles By Building
// ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<BillingCycleResponseDto> getBillingCyclesByBuilding(
            Long buildingId
    ) {

        Building building = getAssignedBuilding(
                buildingId
        );

        return billingCycleRepository.findByBuilding(
                        building
                )
                .stream()
                .map(billingCycleMapper::toResponseDto)
                .toList();

    }

    // ==========================================
    // Update Billing Cycle
    // ==========================================

    @Override
    public BillingCycleResponseDto updateBillingCycle(
            Long billingCycleId,
            UpdateBillingCycleRequestDto request
    ) {

        BillingCycle billingCycle = getBillingCycle(
                billingCycleId
        );

        Building building = getAssignedBuilding(
                billingCycle.getBuilding().getId()
        );

        // Closed billing cycle cannot be edited
        if (billingCycle.getBillingStatus() == BillingStatus.CLOSED) {

            throw new BadRequestException(
                    "Closed billing cycle cannot be updated."
            );

        }

        String cycleName = request.getCycleName().trim();

        // Duplicate cycle name
        if (billingCycleRepository
                .existsByBuildingAndCycleNameAndIdNot(
                        building,
                        cycleName,
                        billingCycleId
                )) {

            throw new DuplicateResourceException(
                    "Billing cycle already exists with name: "
                            + cycleName
            );

        }

        validateBillingCycleDates(
                request.getStartDate(),
                request.getEndDate(),
                request.getDueDate()
        );

        validateBillingCycleOverlap(
                building,
                request.getStartDate(),
                request.getEndDate(),
                billingCycleId
        );

        billingCycleMapper.updateEntity(
                request,
                billingCycle
        );

        billingCycle.setCycleName(
                cycleName
        );

        BillingCycle updatedBillingCycle =
                billingCycleRepository.save(
                        billingCycle
                );

        return billingCycleMapper.toResponseDto(
                updatedBillingCycle
        );

    }

    // ==========================================
// Close Billing Cycle
// ==========================================

    @Override
    public BillingCycleResponseDto closeBillingCycle(
            Long billingCycleId
    ) {

        BillingCycle billingCycle = getBillingCycle(
                billingCycleId
        );

        getAssignedBuilding(
                billingCycle.getBuilding().getId()
        );

        if (billingCycle.getBillingStatus() == BillingStatus.CLOSED) {

            throw new DuplicateResourceException(
                    "Billing cycle is already closed."
            );

        }

        billingCycle.setBillingStatus(
                BillingStatus.CLOSED
        );

        BillingCycle updatedBillingCycle =
                billingCycleRepository.save(
                        billingCycle
                );

        return billingCycleMapper.toResponseDto(
                updatedBillingCycle
        );

    }

    // ==========================================
// Delete Billing Cycle
// ==========================================

    @Override
    public void deleteBillingCycle(
            Long billingCycleId
    ) {

        BillingCycle billingCycle = getBillingCycle(
                billingCycleId
        );

        getAssignedBuilding(
                billingCycle.getBuilding().getId()
        );

        if (billingCycle.getBillingStatus() == BillingStatus.CLOSED) {

            throw new BadRequestException(
                    "Closed billing cycle cannot be deleted."
            );

        }

        if (!billingCycle.getWaterUsageLogs().isEmpty()) {

            throw new BadRequestException(
                    "Billing cycle cannot be deleted because water usage records exist."
            );

        }

        billingCycleRepository.delete(
                billingCycle
        );

    }

    // ==========================================
// Helper Methods
// ==========================================

    private Building getAssignedBuilding(
            Long buildingId
    ) {

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

        Building building = buildingRepository.findById(
                        buildingId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Building not found with ID: " + buildingId
                        )
                );

        if (!managerBuildingRepository.existsByManagerAndBuilding(
                manager,
                building
        )) {

            throw new AccessDeniedException(
                    "You are not assigned to this building."
            );

        }

        return building;

    }

    private BillingCycle getBillingCycle(
            Long billingCycleId
    ) {

        return billingCycleRepository.findById(
                        billingCycleId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Billing cycle not found with ID: "
                                        + billingCycleId
                        )
                );

    }

    private void validateBillingCycleDates(
            LocalDate startDate,
            LocalDate endDate,
            LocalDate dueDate
    ) {

        if (startDate.isAfter(endDate)) {

            throw new BadRequestException(
                    "Start date cannot be after end date."
            );

        }

        if (dueDate.isBefore(endDate)) {

            throw new BadRequestException(
                    "Due date cannot be before end date."
            );

        }

    }

    private void validateBillingCycleOverlap(
            Building building,
            LocalDate startDate,
            LocalDate endDate
    ) {

        boolean overlap =
                billingCycleRepository
                        .existsByBuildingAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                                building,
                                endDate,
                                startDate
                        );

        if (overlap) {

            throw new DuplicateResourceException(
                    "Billing cycle overlaps with an existing billing cycle."
            );

        }

    }

    private void validateBillingCycleOverlap(
            Building building,
            LocalDate startDate,
            LocalDate endDate,
            Long billingCycleId
    ) {

        boolean overlap =
                billingCycleRepository
                        .existsByBuildingAndStartDateLessThanEqualAndEndDateGreaterThanEqualAndIdNot(
                                building,
                                endDate,
                                startDate,
                                billingCycleId
                        );

        if (overlap) {

            throw new DuplicateResourceException(
                    "Billing cycle overlaps with an existing billing cycle."
            );

        }

    }
}