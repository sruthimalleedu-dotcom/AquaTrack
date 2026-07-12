package com.aquatrack.service;

import com.aquatrack.dto.propertyadminmanagement.PropertyAdminResponse;
import com.aquatrack.dto.propertyadminmanagement.PropertyAdminSummaryResponse;

import java.util.List;

public interface PropertyAdminManagementService {

    // ==========================================
    // Property Admin Management
    // ==========================================

    List<PropertyAdminSummaryResponse> getAllPropertyAdmins();

    PropertyAdminResponse getPropertyAdminById(
            Long propertyAdminId
    );

    void suspendPropertyAdmin(
            Long propertyAdminId
    );

    void reactivatePropertyAdmin(
            Long propertyAdminId
    );

}