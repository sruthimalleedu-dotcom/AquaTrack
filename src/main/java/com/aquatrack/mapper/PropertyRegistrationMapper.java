package com.aquatrack.mapper;

import com.aquatrack.dto.propertyregistration.PropertyRegistrationCreateRequest;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationSummaryResponse;
import com.aquatrack.entity.PropertyRegistrationRequest;
import org.springframework.stereotype.Component;

@Component
public class PropertyRegistrationMapper {

    // ==========================================
    // Create Request -> Entity
    // ==========================================

    public PropertyRegistrationRequest toEntity(
            PropertyRegistrationCreateRequest request
    ) {

        return PropertyRegistrationRequest.builder()
                .companyName(request.getCompanyName())
                .contactPersonName(request.getContactPersonName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .propertyType(request.getPropertyType())
                .numberOfApartments(request.getNumberOfApartments())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .build();

    }

    // ==========================================
    // Entity -> Response
    // ==========================================

    public PropertyRegistrationResponse toResponse(
            PropertyRegistrationRequest entity
    ) {

        return PropertyRegistrationResponse.builder()
                .id(entity.getId())
                .propertyAdminId(
                        entity.getPropertyAdmin() != null
                                ? entity.getPropertyAdmin().getId()
                                : null
                )
                .companyName(entity.getCompanyName())
                .contactPersonName(entity.getContactPersonName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .propertyType(entity.getPropertyType())
                .numberOfApartments(entity.getNumberOfApartments())
                .address(entity.getAddress())
                .city(entity.getCity())
                .state(entity.getState())
                .pincode(entity.getPincode())
                .status(entity.getStatus())
                .remarks(entity.getRemarks())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();

    }

    // ==========================================
    // Entity -> Summary Response
    // ==========================================

    public PropertyRegistrationSummaryResponse toSummaryResponse(
            PropertyRegistrationRequest entity
    ) {

        return PropertyRegistrationSummaryResponse.builder()
                .id(entity.getId())
                .companyName(entity.getCompanyName())
                .contactPersonName(entity.getContactPersonName())
                .email(entity.getEmail())
                .propertyType(entity.getPropertyType())
                .numberOfApartments(entity.getNumberOfApartments())
                .city(entity.getCity())
                .state(entity.getState())
                .status(entity.getStatus())
                .build();

    }

}
