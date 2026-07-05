package com.aquatrack.service;

import com.aquatrack.dto.propertyregistration.PropertyRegistrationCreateRequest;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationSummaryResponse;
import com.aquatrack.dto.propertyregistration.ApprovePropertyRegistrationResponse;
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
    // Super Admin APIs
    // ==========================================

    List<PropertyRegistrationSummaryResponse> getAllRegistrationRequests();

    PropertyRegistrationResponse getRegistrationRequestById(Long requestId);

    // ==========================================
    // Super Admin Actions
    // ==========================================

    ApprovePropertyRegistrationResponse approveRegistrationRequest(
            Long requestId
    );

    PropertyRegistrationResponse rejectRegistrationRequest(
            Long requestId,
            RejectPropertyRegistrationRequest request
    );

}