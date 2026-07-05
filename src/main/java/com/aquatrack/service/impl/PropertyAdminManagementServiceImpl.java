package com.aquatrack.service.impl;

import com.aquatrack.dto.propertyadminmanagement.PropertyAdminResponse;
import com.aquatrack.dto.propertyadminmanagement.PropertyAdminSummaryResponse;
import com.aquatrack.enums.UserRole;
import com.aquatrack.mapper.PropertyAdminMapper;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.entity.User;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.service.PropertyAdminManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyAdminManagementServiceImpl
        implements PropertyAdminManagementService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final UserRepository userRepository;

    private final PropertyAdminMapper propertyAdminMapper;

    // ==========================================
    // Get All Property Admins
    // ==========================================

    @Override
    public List<PropertyAdminSummaryResponse> getAllPropertyAdmins() {

        return userRepository
                .findAllByRoleOrderByIdAsc(UserRole.PROPERTY_ADMIN)
                .stream()
                .map(propertyAdminMapper::toSummaryResponse)
                .toList();

    }

    // ==========================================
    // Get Property Admin By Id
    // ==========================================

    @Override
    public PropertyAdminResponse getPropertyAdminById(
            Long propertyAdminId) {

        // ==========================================
        // Find Property Admin
        // ==========================================

        User propertyAdmin = userRepository
                .findByIdAndRole(
                        propertyAdminId,
                        UserRole.PROPERTY_ADMIN
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Property admin not found with id: "
                                        + propertyAdminId
                        ));

        // ==========================================
        // Convert Entity -> Response
        // ==========================================

        return propertyAdminMapper.toResponse(
                propertyAdmin
        );

    }

    // ==========================================
    // Suspend Property Admin
    // ==========================================

    @Override
    public void suspendPropertyAdmin(
            Long propertyAdminId) {

        // ==========================================
        // Find Property Admin
        // ==========================================

        User propertyAdmin = userRepository
                .findByIdAndRole(
                        propertyAdminId,
                        UserRole.PROPERTY_ADMIN
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Property admin not found with id: "
                                        + propertyAdminId
                        ));

        // ==========================================
        // Validate Current Status
        // ==========================================

        if (!Boolean.TRUE.equals(propertyAdmin.getIsActive())) {

            throw new IllegalStateException(
                    "Property admin is already suspended."
            );

        }

        // ==========================================
        // Suspend Property Admin
        // ==========================================

        propertyAdmin.setIsActive(false);

        userRepository.save(propertyAdmin);

    }

    // ==========================================
    // Reactivate Property Admin
    // ==========================================

    @Override
    public void reactivatePropertyAdmin(
            Long propertyAdminId) {

        // ==========================================
        // Find Property Admin
        // ==========================================

        User propertyAdmin = userRepository
                .findByIdAndRole(
                        propertyAdminId,
                        UserRole.PROPERTY_ADMIN
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Property admin not found with id: "
                                        + propertyAdminId
                        ));

        // ==========================================
        // Validate Current Status
        // ==========================================

        if (Boolean.TRUE.equals(propertyAdmin.getIsActive())) {

            throw new IllegalStateException(
                    "Property admin is already active."
            );

        }

        // ==========================================
        // Reactivate Property Admin
        // ==========================================

        propertyAdmin.setIsActive(true);

        userRepository.save(propertyAdmin);

    }

}