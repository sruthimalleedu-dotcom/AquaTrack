package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.resident.ResidentRequest;
import com.aquatrack.dto.resident.ResidentResponse;
import com.aquatrack.service.ResidentService;
import com.aquatrack.util.MessageUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@RestController
@RequestMapping("/api/households/{householdId}/residents")
@RequiredArgsConstructor
public class ResidentController {

    private final ResidentService residentService;
    private final MessageUtil messageUtil;
    // ==========================================
    // Create Resident
    // ==========================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ResidentResponse> createResident(
            @PathVariable Long householdId,
            @Valid @RequestBody ResidentRequest request
    ) {

        ResidentResponse response = residentService.createResident(
                householdId,
                request
        );

        return ApiResponse.success(
                messageUtil.get("resident.created"),
                response
        );
    }

    // ==========================================
    // Get All Residents
    // ==========================================

    @GetMapping
    public ApiResponse<List<ResidentResponse>> getResidentsByHousehold(
            @PathVariable Long householdId
    ) {

        List<ResidentResponse> residents =
                residentService.getResidentsByHousehold(
                        householdId
                );

        return ApiResponse.success(
                messageUtil.get("resident.fetched"),
                residents
        );

    }

    // ==========================================
    // Get Resident By ID
    // ==========================================

    @GetMapping("/{residentId}")
    public ApiResponse<ResidentResponse> getResidentById(
            @PathVariable Long householdId,
            @PathVariable Long residentId
    ) {

        ResidentResponse resident = residentService.getResidentById(
                householdId,
                residentId
        );

        return ApiResponse.success(
                messageUtil.get(
                        "resident.single.fetched"),
                resident
        );
    }

    // ==========================================
    // Update Resident
    // ==========================================

    @PutMapping("/{residentId}")
    public ApiResponse<ResidentResponse> updateResident(
            @PathVariable Long householdId,
            @PathVariable Long residentId,
            @Valid @RequestBody ResidentRequest request
    ) {

        ResidentResponse resident = residentService.updateResident(
                householdId,
                residentId,
                request
        );

        return ApiResponse.success(
                messageUtil.get("resident.updated"),
                resident
        );
    }

    // ==========================================
    // Suspend Resident
    // ==========================================

    @PatchMapping("/{residentId}/suspend")
    public ApiResponse<Void> suspendResident(
            @PathVariable Long householdId,
            @PathVariable Long residentId
    ) {

        residentService.suspendResident(
                householdId,
                residentId
        );

        return ApiResponse.success(
                messageUtil.get("resident.suspended")
        );
    }

    // ==========================================
    // Reactivate Resident
    // ==========================================

    @PatchMapping("/{residentId}/reactivate")
    public ApiResponse<Void> reactivateResident(
            @PathVariable Long householdId,
            @PathVariable Long residentId
    ) {

        residentService.reactivateResident(
                householdId,
                residentId
        );

        return ApiResponse.success(
                messageUtil.get("resident.reactivated")
        );
    }

}
