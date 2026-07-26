package com.aquatrack.service.impl;

import com.aquatrack.dto.admin.DashboardSummaryResponseDto;
import com.aquatrack.entity.PropertyRegistrationRequest;
import com.aquatrack.enums.RegistrationStatus;
import com.aquatrack.enums.UserRole;
import com.aquatrack.repository.PropertyRegistrationRequestRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for Super Admin Dashboard.
 *
 * Provides dashboard statistics.
 */
@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PropertyRegistrationRequestRepository
            propertyRegistrationRequestRepository;

    private final UserRepository userRepository;

    // ==========================================
    // Dashboard Summary
    // ==========================================

    @Override
    public DashboardSummaryResponseDto getDashboardSummary() {

        long totalRegistrations =
                propertyRegistrationRequestRepository.count();

        long pendingRegistrations =
                propertyRegistrationRequestRepository
                        .countByStatus(
                                RegistrationStatus.PENDING
                        );

        long approvedRegistrations =
                propertyRegistrationRequestRepository
                        .countByStatus(
                                RegistrationStatus.APPROVED
                        );

        long rejectedRegistrations =
                propertyRegistrationRequestRepository
                        .countByStatus(
                                RegistrationStatus.REJECTED
                        );

        long totalPropertyAdmins =
                userRepository.countByRole(
                        UserRole.PROPERTY_ADMIN
                );

        long activePropertyAdmins =
                userRepository.countByRoleAndIsActiveTrue(
                        UserRole.PROPERTY_ADMIN
                );

        long inactivePropertyAdmins =
                userRepository.countByRoleAndIsActiveFalse(
                        UserRole.PROPERTY_ADMIN
                );

        return DashboardSummaryResponseDto.builder()

                .totalRegistrations(totalRegistrations)

                .pendingRegistrations(pendingRegistrations)

                .approvedRegistrations(approvedRegistrations)

                .rejectedRegistrations(rejectedRegistrations)

                .totalPropertyAdmins(totalPropertyAdmins)

                .activePropertyAdmins(activePropertyAdmins)

                .inactivePropertyAdmins(inactivePropertyAdmins)

                .build();

    }

}