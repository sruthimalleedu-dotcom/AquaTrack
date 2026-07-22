package com.aquatrack.service.impl;

import com.aquatrack.dto.waterusage.CreateWaterUsageRequestDto;
import com.aquatrack.dto.waterusage.UpdateWaterUsageRequestDto;
import com.aquatrack.dto.waterusage.WaterUsageResponseDto;
import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.User;
import com.aquatrack.entity.WaterUsageLog;
import com.aquatrack.enums.UploadType;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.WaterUsageMapper;
import com.aquatrack.repository.BillingCycleRepository;
import com.aquatrack.repository.HouseholdRepository;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.repository.WaterUsageLogRepository;
import com.aquatrack.service.WaterUsageService;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WaterUsageServiceImpl implements WaterUsageService {

    // ==========================================
    // Repositories
    // ==========================================

    private final WaterUsageLogRepository waterUsageLogRepository;

    private final HouseholdRepository householdRepository;

    private final BillingCycleRepository billingCycleRepository;

    private final UserRepository userRepository;

    private final ManagerBuildingRepository managerBuildingRepository;

    // ==========================================
    // Mapper
    // ==========================================

    private final WaterUsageMapper waterUsageMapper;

    // ==========================================
    // Create Water Usage
    // ==========================================

    @Override
    public WaterUsageResponseDto createWaterUsage(
            Long householdId,
            CreateWaterUsageRequestDto requestDto
    ) {

        Household household = getAssignedHousehold(householdId);

        if (waterUsageLogRepository.existsByHouseholdAndReadingDate(
                household,
                requestDto.getReadingDate()
        )) {

            throw new DuplicateResourceException(
                    "Water usage already exists for reading date: "
                            + requestDto.getReadingDate()
            );

        }

        BillingCycle billingCycle = getBillingCycle(
                household,
                requestDto.getReadingDate()
        );

        BigDecimal waterUsage = calculateWaterUsage(
                requestDto.getPreviousReading(),
                requestDto.getCurrentReading()
        );

        User manager = getCurrentManager();

        WaterUsageLog waterUsageLog = WaterUsageLog.builder()
                .household(household)
                .billingCycle(billingCycle)
                .uploadedBy(manager)
                .readingDate(requestDto.getReadingDate())
                .previousReading(requestDto.getPreviousReading())
                .currentReading(requestDto.getCurrentReading())
                .waterUsage(waterUsage)
                .uploadType(UploadType.MANUAL)
                .remarks(requestDto.getRemarks())
                .build();

        waterUsageLog = waterUsageLogRepository.save(waterUsageLog);

        return waterUsageMapper.toResponseDto(waterUsageLog);

    }

    // ==========================================
    // Update Water Usage
    // ==========================================

    @Override
    public WaterUsageResponseDto updateWaterUsage(
            Long householdId,
            Long waterUsageId,
            UpdateWaterUsageRequestDto requestDto
    ) {

        WaterUsageLog waterUsageLog = getWaterUsage(
                householdId,
                waterUsageId
        );

        Household household = waterUsageLog.getHousehold();

        if (!waterUsageLog.getReadingDate().equals(requestDto.getReadingDate())
                && waterUsageLogRepository.existsByHouseholdAndReadingDate(
                household,
                requestDto.getReadingDate()
        )) {

            throw new DuplicateResourceException(
                    "Water usage already exists for reading date: "
                            + requestDto.getReadingDate()
            );

        }

        BillingCycle billingCycle = getBillingCycle(
                household,
                requestDto.getReadingDate()
        );

        BigDecimal waterUsage = calculateWaterUsage(
                requestDto.getPreviousReading(),
                requestDto.getCurrentReading()
        );

        waterUsageLog.setBillingCycle(billingCycle);
        waterUsageLog.setReadingDate(requestDto.getReadingDate());
        waterUsageLog.setPreviousReading(requestDto.getPreviousReading());
        waterUsageLog.setCurrentReading(requestDto.getCurrentReading());
        waterUsageLog.setWaterUsage(waterUsage);
        waterUsageLog.setRemarks(requestDto.getRemarks());

        waterUsageLog = waterUsageLogRepository.save(waterUsageLog);

        return waterUsageMapper.toResponseDto(waterUsageLog);

    }

    // ==========================================
    // Get Water Usage By ID
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public WaterUsageResponseDto getWaterUsageById(
            Long householdId,
            Long waterUsageId
    ) {

        WaterUsageLog waterUsageLog = getWaterUsage(
                householdId,
                waterUsageId
        );

        return waterUsageMapper.toResponseDto(waterUsageLog);

    }

    // ==========================================
    // Get All Water Usage
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<WaterUsageResponseDto> getAllWaterUsage(
            Long householdId
    ) {

        Household household = getAssignedHousehold(householdId);

        return waterUsageLogRepository
                .findByHouseholdOrderByReadingDateDesc(household)
                .stream()
                .map(waterUsageMapper::toResponseDto)
                .toList();

    }

    // ==========================================
    // Delete Water Usage
    // ==========================================

    @Override
    public void deleteWaterUsage(
            Long householdId,
            Long waterUsageId
    ) {

        WaterUsageLog waterUsageLog = getWaterUsage(
                householdId,
                waterUsageId
        );

        waterUsageLogRepository.delete(waterUsageLog);

    }

    // ==========================================
    // Helper Methods
    // ==========================================

    private Household getAssignedHousehold(Long householdId) {

        User manager = getCurrentManager();

        Household household = householdRepository.findById(householdId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Household not found with ID: " + householdId
                        )
                );

        if (!managerBuildingRepository.existsByManagerAndBuilding(
                manager,
                household.getFloor().getBuilding()
        )) {

            throw new AccessDeniedException(
                    "You are not assigned to this building."
            );

        }

        return household;

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

    /**
     * Automatically determine the billing cycle
     * based on the household's building and reading date.
     */
    private BillingCycle getBillingCycle(
            Household household,
            LocalDate readingDate
    ) {

        return billingCycleRepository
                .findByBuildingAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        household.getFloor().getBuilding(),
                        readingDate,
                        readingDate
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "No billing cycle found for the reading date: "
                                        + readingDate
                        )
                );

    }

    private WaterUsageLog getWaterUsage(
            Long householdId,
            Long waterUsageId
    ) {

        Household household = getAssignedHousehold(householdId);

        return waterUsageLogRepository.findById(waterUsageId)
                .filter(waterUsage ->
                        waterUsage.getHousehold().getId().equals(household.getId())
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Water usage not found with ID: " + waterUsageId
                        )
                );

    }

    /**
     * Calculate water consumption.
     */
    private BigDecimal calculateWaterUsage(
            BigDecimal previousReading,
            BigDecimal currentReading
    ) {

        if (currentReading.compareTo(previousReading) < 0) {

            throw new IllegalArgumentException(
                    "Current reading cannot be less than previous reading."
            );

        }

        return currentReading.subtract(previousReading);

    }
}