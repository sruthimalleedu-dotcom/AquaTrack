package com.aquatrack_backend.service;

import com.aquatrack_backend.dto.WaterUsageDTO;
import com.aquatrack_backend.entity.Household;
import com.aquatrack_backend.entity.User;
import com.aquatrack_backend.entity.WaterUsageLog;
import com.aquatrack_backend.repository.UserRepository;
import com.aquatrack_backend.repository.WaterUsageLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service responsible for fetching
 * water usage details of residents.
 */
@Service
@RequiredArgsConstructor
public class WaterUsageService {

    // Repository to access water usage records
    private final WaterUsageLogRepository waterUsageLogRepository;

    // Repository to fetch logged-in resident details
    private final UserRepository userRepository;

    /**
     * Returns all water usage logs
     * of a resident using username.
     */
    public List<WaterUsageDTO> getWaterUsage(String username) {

        // Find resident
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Resident not found."));

        // Get resident household
        Household household = user.getHousehold();

        // Fetch all water usage logs
        List<WaterUsageLog> logs =
                waterUsageLogRepository.findByHousehold(household);

        // Convert Entity -> DTO
        return logs.stream()

                .map(log -> new WaterUsageDTO(

                        log.getReadingDate(),
                        log.getReadingValue(),
                        log.getSource()

                ))

                .toList();
    }
}