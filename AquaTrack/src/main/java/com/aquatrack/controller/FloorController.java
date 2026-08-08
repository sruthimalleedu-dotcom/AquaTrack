package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.floor.FloorRequestDto;
import com.aquatrack.service.FloorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.aquatrack.util.MessageUtil;

/**
 * REST Controller for Floor Management.
 *
 * Handles CRUD operations for building floors.
 * Only PROPERTY_ADMIN users are allowed to manage floors.
 */
@RestController
@RequestMapping("/api/buildings/{buildingId}/floors")
@RequiredArgsConstructor
public class FloorController {

    // ==========================
    // Dependencies
    // ==========================

    private final FloorService floorService;
    private final MessageUtil messageUtil;

    // ==========================
    // Create Floor
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createFloor(
            @PathVariable Long buildingId,
            @Valid @RequestBody FloorRequestDto requestDto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        messageUtil.get("floor.created"),
                        floorService.createFloor(buildingId, requestDto)
                ));
    }

    // ==========================
    // Get All Floors
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllFloors(
            @PathVariable Long buildingId) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("floors.fetched"),
                        floorService.getAllFloors(buildingId)
                )
        );
    }

    // ==========================
    // Get Floor By ID
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @GetMapping("/{floorId}")
    public ResponseEntity<ApiResponse<?>> getFloorById(
            @PathVariable Long buildingId,
            @PathVariable Long floorId) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("floor.fetched"),
                        floorService.getFloorById(buildingId, floorId)
                )
        );
    }

    // ==========================
    // Update Floor
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @PutMapping("/{floorId}")
    public ResponseEntity<ApiResponse<?>> updateFloor(
            @PathVariable Long buildingId,
            @PathVariable Long floorId,
            @Valid @RequestBody FloorRequestDto requestDto) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("floor.updated"),
                        floorService.updateFloor(
                                buildingId,
                                floorId,
                                requestDto
                        )
                )
        );
    }

    // ==========================
    // Delete Floor
    // ==========================

    @PreAuthorize("hasRole('PROPERTY_ADMIN')")
    @DeleteMapping("/{floorId}")
    public ResponseEntity<ApiResponse<?>> deleteFloor(
            @PathVariable Long buildingId,
            @PathVariable Long floorId) {

        floorService.deleteFloor(buildingId, floorId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("floor.deleted"),
                        null
                )
        );
    }

}