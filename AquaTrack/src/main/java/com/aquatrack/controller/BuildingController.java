package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.building.BuildingRequestDto;
import com.aquatrack.service.BuildingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.aquatrack.util.MessageUtil;

/**
 * REST Controller for Building Management.
 *
 * Handles CRUD operations for apartment buildings.
 * Only PROPERTY_ADMIN users are allowed to manage buildings.
 */
@RestController
@RequestMapping("/api/apartments/{apartmentId}/buildings")
@RequiredArgsConstructor
public class BuildingController {

    // ==========================
    // Dependencies
    // ==========================

    private final BuildingService buildingService;
    private final MessageUtil messageUtil;

    // ==========================
    // Create Building
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createBuilding(
            @PathVariable Long apartmentId,
            @Valid @RequestBody BuildingRequestDto requestDto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        messageUtil.get("building.created"),
                        buildingService.createBuilding(apartmentId, requestDto)
                ));
    }

    // ==========================
    // Get All Buildings
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllBuildings(
            @PathVariable Long apartmentId) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("buildings.fetched"),
                        buildingService.getAllBuildings(apartmentId)
                )
        );
    }

    // ==========================
    // Get Building By ID
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @GetMapping("/{buildingId}")
    public ResponseEntity<ApiResponse<?>> getBuildingById(
            @PathVariable Long apartmentId,
            @PathVariable Long buildingId) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("building.fetched"),
                        buildingService.getBuildingById(apartmentId, buildingId)
                )
        );
    }

    // ==========================
    // Update Building
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @PutMapping("/{buildingId}")
    public ResponseEntity<ApiResponse<?>> updateBuilding(
            @PathVariable Long apartmentId,
            @PathVariable Long buildingId,
            @Valid @RequestBody BuildingRequestDto requestDto) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("building.updated"),
                        buildingService.updateBuilding(
                                apartmentId,
                                buildingId,
                                requestDto
                        )
                )
        );
    }

    // ==========================
    // Delete Building
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @DeleteMapping("/{buildingId}")
    public ResponseEntity<ApiResponse<?>> deleteBuilding(
            @PathVariable Long apartmentId,
            @PathVariable Long buildingId) {

        buildingService.deleteBuilding(apartmentId, buildingId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("building.deleted"),
                        null
                )
        );
    }

}