package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.propertyadmin.PropertyAdminActivationResponse;
import com.aquatrack.dto.propertyadmin.SetPasswordRequest;
import com.aquatrack.service.PropertyAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/property-admin")
@RequiredArgsConstructor
public class PropertyAdminController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PropertyAdminService propertyAdminService;

    // ==========================================
    // Validate Activation Token
    // ==========================================

    @GetMapping("/activate")
    public ResponseEntity<ApiResponse<PropertyAdminActivationResponse>>
    validateActivationToken(
            @RequestParam String token) {

        PropertyAdminActivationResponse response =
                propertyAdminService.validateActivationToken(token);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Activation token is valid.",
                        response
                )
        );

    }

    // ==========================================
    // Set Password & Activate Account
    // ==========================================

    @PostMapping("/set-password")
    public ResponseEntity<ApiResponse<Void>>
    setPassword(
            @Valid
            @RequestBody
            SetPasswordRequest request) {

        propertyAdminService.setPassword(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Password set successfully. Account activated.",
                        null
                )
        );

    }

}