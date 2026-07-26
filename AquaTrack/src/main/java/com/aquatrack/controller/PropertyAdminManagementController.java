package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.propertyadminmanagement.PropertyAdminResponse;
import com.aquatrack.dto.propertyadminmanagement.PropertyAdminSummaryResponse;
import com.aquatrack.service.PropertyAdminManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/property-admins")
@RequiredArgsConstructor
public class PropertyAdminManagementController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PropertyAdminManagementService propertyAdminManagementService;

    // ==========================================
    // Get All Property Admins
    // ==========================================

    @GetMapping
    public ResponseEntity<ApiResponse<List<PropertyAdminSummaryResponse>>>
    getAllPropertyAdmins() {

        List<PropertyAdminSummaryResponse> response =
                propertyAdminManagementService.getAllPropertyAdmins();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Property admins fetched successfully.",
                        response
                )
        );

    }

    // ==========================================
    // Get Property Admin By Id
    // ==========================================

    @GetMapping("/{propertyAdminId}")
    public ResponseEntity<ApiResponse<PropertyAdminResponse>>
    getPropertyAdminById(
            @PathVariable Long propertyAdminId) {

        PropertyAdminResponse response =
                propertyAdminManagementService.getPropertyAdminById(
                        propertyAdminId
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Property admin fetched successfully.",
                        response
                )
        );

    }

    // ==========================================
    // Suspend Property Admin
    // ==========================================

    @PutMapping("/{propertyAdminId}/suspend")
    public ResponseEntity<ApiResponse<Void>> suspendPropertyAdmin(
            @PathVariable Long propertyAdminId) {

        propertyAdminManagementService.suspendPropertyAdmin(
                propertyAdminId
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Property admin suspended successfully."
                )
        );

    }

    // ==========================================
    // Reactivate Property Admin
    // ==========================================

    @PutMapping("/{propertyAdminId}/reactivate")
    public ResponseEntity<ApiResponse<Void>> reactivatePropertyAdmin(
            @PathVariable Long propertyAdminId) {

        propertyAdminManagementService.reactivatePropertyAdmin(
                propertyAdminId
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Property admin reactivated successfully."
                )
        );

    }

}
