package com.aquatrack.service.impl;

import com.aquatrack.dto.resident.ResidentWaterUsageResponseDto;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.User;
import com.aquatrack.entity.WaterUsageLog;
import com.aquatrack.enums.UserRole;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.repository.WaterUsageLogRepository;
import com.aquatrack.service.ResidentWaterUsageService;
import com.aquatrack.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ResidentWaterUsageServiceImpl
        implements ResidentWaterUsageService {

    private final UserRepository userRepository;
    private final WaterUsageLogRepository waterUsageLogRepository;

    // ==========================================
    // My Water Usage
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<ResidentWaterUsageResponseDto> getMyWaterUsage() {

        User resident = getCurrentResident();

        Household household = resident.getHousehold();

        if (household == null) {
            throw new ResourceNotFoundException(
                    "No household assigned to the resident."
            );
        }

        return waterUsageLogRepository
                .findByHouseholdOrderByReadingDateDesc(household)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    // ==========================================
    // Helper Methods
    // ==========================================

    /**
     * Returns the currently logged-in resident.
     *
     * @return Resident user
     */
    private User getCurrentResident() {

        String email = SecurityUtil.getCurrentUserEmail();

        User resident = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Logged-in resident not found."
                        )
                );

        if (resident.getRole() != UserRole.RESIDENT) {
            throw new AccessDeniedException(
                    "Only residents can access this resource."
            );
        }

        return resident;

    }

    /**
     * Maps WaterUsageLog entity to response DTO.
     *
     * @param usageLog Water usage log
     * @return Resident water usage response
     */
    private ResidentWaterUsageResponseDto mapToResponse(
            WaterUsageLog usageLog
    ) {

        return ResidentWaterUsageResponseDto.builder()
                .usageId(usageLog.getId())
                .billingCycle(
                        usageLog.getBillingCycle().getCycleName()
                )
                .readingDate(
                        usageLog.getReadingDate()
                )
                .previousReading(
                        usageLog.getPreviousReading()
                )
                .currentReading(
                        usageLog.getCurrentReading()
                )
                .waterUsage(
                        usageLog.getWaterUsage()
                )
                .uploadType(
                        usageLog.getUploadType()
                )
                .remarks(
                        usageLog.getRemarks()
                )
                .build();

    }

}
