package com.aquatrack.service;

import com.aquatrack.dto.propertyregistration.PropertyRegistrationCreateRequest;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationSummaryResponse;

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

}