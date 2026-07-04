package com.aquatrack.service.impl;

import com.aquatrack.dto.propertyregistration.PropertyRegistrationCreateRequest;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationSummaryResponse;
import com.aquatrack.entity.PropertyRegistrationRequest;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.PropertyRegistrationMapper;
import com.aquatrack.repository.PropertyRegistrationRequestRepository;
import com.aquatrack.service.PropertyRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyRegistrationServiceImpl
        implements PropertyRegistrationService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PropertyRegistrationRequestRepository repository;

    private final PropertyRegistrationMapper mapper;

    // ==========================================
    // Submit Registration Request
    // ==========================================

    @Override
    public PropertyRegistrationResponse submitRegistrationRequest(
            PropertyRegistrationCreateRequest request) {

        // ==========================================
        // Duplicate Email Validation
        // ==========================================

        if (repository.existsByEmailIgnoreCase(request.getEmail())) {

            throw new DuplicateResourceException(
                    "A registration request already exists with this email."
            );

        }

        // ==========================================
        // DTO -> Entity
        // ==========================================

        PropertyRegistrationRequest entity =
                mapper.toEntity(request);

        // ==========================================
        // Save Registration Request
        // ==========================================

        PropertyRegistrationRequest savedEntity =
                repository.save(entity);

        // ==========================================
        // Entity -> Response
        // ==========================================

        return mapper.toResponse(savedEntity);

    }

    // ==========================================
    // Get All Registration Requests
    // ==========================================

    @Override
    public List<PropertyRegistrationSummaryResponse> getAllRegistrationRequests() {

        return repository.findAll()
                .stream()
                .map(mapper::toSummaryResponse)
                .toList();

    }

    // ==========================================
    // Get Registration Request By ID
    // ==========================================

    @Override
    public PropertyRegistrationResponse getRegistrationRequestById(
            Long requestId) {

        // ==========================================
        // Find Registration Request
        // ==========================================

        PropertyRegistrationRequest entity = repository.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Property registration request not found with id: "
                                        + requestId
                        ));

        // ==========================================
        // Entity -> Response
        // ==========================================

        return mapper.toResponse(entity);

    }

}