package com.aquatrack.service.impl;

import com.aquatrack.dto.alert.AlertRequestDto;
import com.aquatrack.dto.alert.AlertResponseDto;
import com.aquatrack.dto.alert.AlertSummaryResponseDto;
import com.aquatrack.dto.alert.AlertSentResponseDto;
import com.aquatrack.entity.Alert;
import com.aquatrack.entity.User;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.AlertMapper;
import com.aquatrack.repository.AlertRepository;
import com.aquatrack.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.aquatrack.service.CurrentUserService;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.ManagerBuilding;
import com.aquatrack.enums.UserRole;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.HouseholdRepository;
import com.aquatrack.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AlertServiceImpl implements AlertService {

    private final AlertRepository alertRepository;
    private final CurrentUserService currentUserService;
    private final AlertMapper alertMapper;

    private final ManagerBuildingRepository managerBuildingRepository;
    private final HouseholdRepository householdRepository;
    private final UserRepository userRepository;

    @Override
    public AlertSentResponseDto createAlert(AlertRequestDto requestDto) {

        User manager = currentUserService.getCurrentUser();

        if (manager.getRole() != UserRole.MANAGER) {
            throw new ResourceNotFoundException("Only managers can send alerts.");
        }

        List<ManagerBuilding> assignments =
                managerBuildingRepository.findByManager(manager);

        int totalAlertsSent = 0;

        for (ManagerBuilding assignment : assignments) {

            Building building = assignment.getBuilding();

            List<Household> households =
                    householdRepository.findByFloor_Building(building);

            for (Household household : households) {

                List<User> residents =
                        userRepository.findByHouseholdIdAndRoleAndIsActiveTrueOrderByFirstNameAsc(
                                household.getId(),
                                UserRole.RESIDENT
                        );

                for (User resident : residents) {

                    Alert alert =
                            alertMapper.toEntity(requestDto, resident);

                    alertRepository.save(alert);

                    totalAlertsSent++;
                }
            }
        }

        return new AlertSentResponseDto(
                "Alert sent successfully.",
                totalAlertsSent
        );    }


    @Override
    public List<AlertSummaryResponseDto> getMyAlerts() {

        User user = currentUserService.getCurrentUser();

        return alertRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(alertMapper::toSummaryDto)
                .toList();
    }

    @Override
    public AlertResponseDto getAlertById(Long id) {

        User user = currentUserService.getCurrentUser();

        Alert alert = alertRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Alert not found."));

        if (!alert.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Alert not found.");
        }

        return alertMapper.toResponseDto(alert);
    }

    @Override
    public AlertResponseDto markAsRead(Long alertId) {

        User user = currentUserService.getCurrentUser();

        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Alert not found."));

        if (!alert.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Alert not found.");
        }

        alert.setRead(true);

        Alert updatedAlert = alertRepository.save(alert);

        return alertMapper.toResponseDto(updatedAlert);
    }

    @Override
    public long getUnreadAlertCount() {

        User user = currentUserService.getCurrentUser();

        return alertRepository.countByUserAndIsReadFalse(user);

    }

    @Override
    public void deleteAlert(Long alertId) {

        User user = currentUserService.getCurrentUser();

        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Alert not found."));

        if (!alert.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Alert not found.");
        }

        alertRepository.delete(alert);
    }
}
