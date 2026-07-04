package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationCreateRequest;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationSummaryResponse;
import com.aquatrack.service.PropertyRegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PropertyRegistrationController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PropertyRegistrationService propertyRegistrationService;

    // ==========================================
    // Public API
    // Submit Property Registration Request
    // ==========================================

    @PostMapping("/api/property-registration")
    public ResponseEntity<ApiResponse<PropertyRegistrationResponse>>
    submitRegistrationRequest(

            @Valid
            @RequestBody
            PropertyRegistrationCreateRequest request
    ) {

        PropertyRegistrationResponse response =
                propertyRegistrationService
                        .submitRegistrationRequest(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Property registration request submitted successfully.",
                                response
                        )
                );

    }

    // ==========================================
    // Super Admin API
    // Get All Registration Requests
    // ==========================================

    @GetMapping("/api/admin/property-registration")
    public ResponseEntity<ApiResponse<List<PropertyRegistrationSummaryResponse>>>
    getAllRegistrationRequests() {

        List<PropertyRegistrationSummaryResponse> response =
                propertyRegistrationService
                        .getAllRegistrationRequests();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Property registration requests fetched successfully.",
                        response
                )
        );

    }

    // ==========================================
    // Super Admin API
    // Get Registration Request By ID
    // ==========================================

    @GetMapping("/api/admin/property-registration/{requestId}")
    public ResponseEntity<ApiResponse<PropertyRegistrationResponse>>
    getRegistrationRequestById(
            @PathVariable Long requestId) {

        PropertyRegistrationResponse response =
                propertyRegistrationService
                        .getRegistrationRequestById(requestId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Property registration request fetched successfully.",
                        response
                )
        );

    }

}