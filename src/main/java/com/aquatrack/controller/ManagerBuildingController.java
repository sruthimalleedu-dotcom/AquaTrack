package com.aquatrack.controller;

import com.aquatrack.dto.building.BuildingResponseDto;
import com.aquatrack.service.BuildingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST API for Manager Building operations.
 */
@RestController
@RequestMapping("/api/manager/buildings")
@RequiredArgsConstructor
public class ManagerBuildingController {

    private final BuildingService buildingService;

    /**
     * Returns all buildings assigned to the logged-in Manager.
     *
     * @return List of assigned buildings
     */
    @GetMapping
    public ResponseEntity<List<BuildingResponseDto>> getManagerBuildings() {

        return ResponseEntity.ok(
                buildingService.getManagerBuildings()
        );

    }

}