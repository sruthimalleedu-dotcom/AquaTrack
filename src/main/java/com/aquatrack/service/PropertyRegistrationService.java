package com.aquatrack.service;

import com.aquatrack.dto.propertyregistration.ApprovePropertyRegistrationResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationCreateRequest;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationSummaryResponse;
import com.aquatrack.dto.propertyregistration.RejectPropertyRegistrationRequest;

import java.util.List;

public interface PropertyRegistrationService {

    // ==========================================
    // Visitor APIs
    // ==========================================

    PropertyRegistrationResponse submitRegistrationRequest(
            PropertyRegistrationCreateRequest request
    );

    // ==========================================
    // SUPER_ADMIN APIs
    // ==========================================

    List<PropertyRegistrationSummaryResponse> getAllRegistrationRequests();

    PropertyRegistrationResponse getRegistrationRequestById(
            Long requestId
    );

    // ==========================================
    // SUPER_ADMIN Actions
    // ==========================================

    ApprovePropertyRegistrationResponse approveRegistrationRequest(
            Long requestId
    );

    void rejectRegistrationRequest(
            Long requestId,
            RejectPropertyRegistrationRequest request
    );

}