package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.resident.ResidentHouseholdResponseDto;
import com.aquatrack.service.ResidentHouseholdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/resident")
@RequiredArgsConstructor
@PreAuthorize("hasRole('RESIDENT')")
public class ResidentHouseholdController {

    private final ResidentHouseholdService residentHouseholdService;

    // ==========================================
    // My Household
    // ==========================================

    /**
     * Returns the household details of the
     * currently logged-in resident.
     *
     * @return Household details
     */
    @GetMapping("/my-household")
    public ResponseEntity<ApiResponse<ResidentHouseholdResponseDto>> getMyHousehold() {

        ResidentHouseholdResponseDto response =
                residentHouseholdService.getMyHousehold();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Household details retrieved successfully.",
                        response
                )
        );

    }

}