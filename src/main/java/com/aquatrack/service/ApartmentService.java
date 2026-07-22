package com.aquatrack.service;

import com.aquatrack.dto.apartment.ApartmentCreateRequest;
import com.aquatrack.dto.apartment.ApartmentResponse;
import com.aquatrack.dto.apartment.ApartmentSummaryResponse;
import com.aquatrack.dto.apartment.ApartmentUpdateRequest;

import java.util.List;

public interface ApartmentService {

    ApartmentResponse createApartment(
            ApartmentCreateRequest request
    );

    ApartmentResponse getApartmentById(
            Long apartmentId
    );

    List<ApartmentSummaryResponse> getAllApartments();

    ApartmentResponse updateApartment(
            Long apartmentId,
            ApartmentUpdateRequest request
    );

    void deleteApartment(
            Long apartmentId
    );


}