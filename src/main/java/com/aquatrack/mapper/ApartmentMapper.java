package com.aquatrack.mapper;

import com.aquatrack.dto.apartment.ApartmentCreateRequest;
import com.aquatrack.dto.apartment.ApartmentResponse;
import com.aquatrack.dto.apartment.ApartmentSummaryResponse;
import com.aquatrack.dto.apartment.ApartmentUpdateRequest;
import com.aquatrack.entity.Apartment;
import org.springframework.stereotype.Component;

@Component
public class ApartmentMapper {

    // ==========================================
    // Create Request -> Entity
    // ==========================================

    public Apartment toEntity(ApartmentCreateRequest request) {

        return Apartment.builder()
                .apartmentName(request.getApartmentName())
                .addressLine1(request.getAddressLine1())
                .addressLine2(request.getAddressLine2())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .build();

    }

    // ==========================================
    // Entity -> Response
    // ==========================================

    public ApartmentResponse toResponse(Apartment apartment) {

        return ApartmentResponse.builder()
                .id(apartment.getId())
                .apartmentName(apartment.getApartmentName())
                .addressLine1(apartment.getAddressLine1())
                .addressLine2(apartment.getAddressLine2())
                .city(apartment.getCity())
                .state(apartment.getState())
                .pincode(apartment.getPincode())
                .totalBuildings(0L)
                .createdAt(apartment.getCreatedAt())
                .updatedAt(apartment.getUpdatedAt())
                .build();

    }

    // ==========================================
    // Entity -> Summary Response
    // ==========================================

    public ApartmentSummaryResponse toSummaryResponse(Apartment apartment) {

        return ApartmentSummaryResponse.builder()
                .id(apartment.getId())
                .apartmentName(apartment.getApartmentName())
                .city(apartment.getCity())
                .state(apartment.getState())
                .totalBuildings(0L)
                .build();

    }

    // ==========================================
    // Update Entity
    // ==========================================

    public void updateEntity(
            Apartment apartment,
            ApartmentUpdateRequest request
    ) {

        apartment.setApartmentName(request.getApartmentName());
        apartment.setAddressLine1(request.getAddressLine1());
        apartment.setAddressLine2(request.getAddressLine2());
        apartment.setCity(request.getCity());
        apartment.setState(request.getState());
        apartment.setPincode(request.getPincode());

    }

}