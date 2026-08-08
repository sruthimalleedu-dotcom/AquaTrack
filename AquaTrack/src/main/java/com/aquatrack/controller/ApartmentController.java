package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.apartment.ApartmentCreateRequest;
import com.aquatrack.dto.apartment.ApartmentResponse;
import com.aquatrack.dto.apartment.ApartmentSummaryResponse;
import com.aquatrack.dto.apartment.ApartmentUpdateRequest;
import com.aquatrack.service.ApartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.aquatrack.util.MessageUtil;

import java.util.List;

@RestController
@RequestMapping("/api/apartments")
@RequiredArgsConstructor
public class ApartmentController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final ApartmentService apartmentService;
    private final MessageUtil messageUtil;

    // ==========================================
    // Create Apartment
    // ==========================================

    @PostMapping
    public ResponseEntity<ApiResponse<ApartmentResponse>> createApartment(
            @Valid @RequestBody ApartmentCreateRequest request) {

        ApartmentResponse response =
                apartmentService.createApartment(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                messageUtil.get("apartment.created"),
                                response
                        )
                );

    }

    // ==========================================
    // Get Apartment By ID
    // ==========================================

    @GetMapping("/{apartmentId}")
    public ResponseEntity<ApiResponse<ApartmentResponse>> getApartmentById(
            @PathVariable Long apartmentId) {

        ApartmentResponse response =
                apartmentService.getApartmentById(apartmentId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("apartment.fetched"),
                        response
                )
        );

    }

    // ==========================================
    // Get All Apartments
    // ==========================================

    @GetMapping
    public ResponseEntity<ApiResponse<List<ApartmentSummaryResponse>>> getAllApartments() {

        List<ApartmentSummaryResponse> response =
                apartmentService.getAllApartments();

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("apartments.fetched"),
                        response
                )
        );

    }

    // ==========================================
    // Update Apartment
    // ==========================================

    @PutMapping("/{apartmentId}")
    public ResponseEntity<ApiResponse<ApartmentResponse>> updateApartment(
            @PathVariable Long apartmentId,
            @Valid @RequestBody ApartmentUpdateRequest request) {

        ApartmentResponse response =
                apartmentService.updateApartment(
                        apartmentId,
                        request
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("apartment.updated"),
                        response
                )
        );

    }

    // ==========================================
    // Delete Apartment
    // ==========================================

    @DeleteMapping("/{apartmentId}")
    public ResponseEntity<ApiResponse<Void>> deleteApartment(
            @PathVariable Long apartmentId) {

        apartmentService.deleteApartment(apartmentId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        messageUtil.get("apartment.deleted")
                )
        );

    }

}
