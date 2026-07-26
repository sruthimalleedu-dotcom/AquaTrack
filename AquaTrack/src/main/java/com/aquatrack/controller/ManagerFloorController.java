package com.aquatrack.controller;

import com.aquatrack.dto.floor.FloorResponseDto;
import com.aquatrack.service.FloorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST API for Manager Floor operations.
 */
@RestController
@RequestMapping("/api/manager/buildings")
@RequiredArgsConstructor
public class ManagerFloorController {

    private final FloorService floorService;

    /**
     * Returns all floors of a building assigned
     * to the logged-in Manager.
     *
     * @param buildingId Building ID
     * @return List of floors
     */
    @GetMapping("/{buildingId}/floors")
    public ResponseEntity<List<FloorResponseDto>> getManagerFloors(
            @PathVariable Long buildingId
    ) {

        return ResponseEntity.ok(
                floorService.getManagerFloors(buildingId)
        );

    }

}