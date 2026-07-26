package com.aquatrack.service.impl;

import com.aquatrack.dto.apartment.ApartmentCreateRequest;
import com.aquatrack.dto.apartment.ApartmentResponse;
import com.aquatrack.dto.apartment.ApartmentSummaryResponse;
import com.aquatrack.dto.apartment.ApartmentUpdateRequest;
import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.User;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.ApartmentMapper;
import com.aquatrack.repository.ApartmentRepository;
import com.aquatrack.repository.BuildingRepository;
import com.aquatrack.service.ApartmentService;
import com.aquatrack.service.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApartmentServiceImpl implements ApartmentService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final ApartmentRepository apartmentRepository;

    private final BuildingRepository buildingRepository;

    private final ApartmentMapper apartmentMapper;

    private final CurrentUserService currentUserService;

    // ==========================================
    // Create Apartment
    // ==========================================

    @Override
    public ApartmentResponse createApartment(
            ApartmentCreateRequest request
    ) {

        User propertyAdmin = currentUserService.getCurrentUser();

        if (apartmentRepository
                .existsByApartmentNameIgnoreCaseAndPincodeAndPropertyAdmin(
                        request.getApartmentName(),
                        request.getPincode(),
                        propertyAdmin
                )) {

            throw new DuplicateResourceException(
                    "Apartment already exists with the same name and pincode."
            );

        }

        Apartment apartment = apartmentMapper.toEntity(request);

        apartment.setPropertyAdmin(propertyAdmin);

        Apartment savedApartment =
                apartmentRepository.save(apartment);

        return buildResponse(savedApartment);

    }

    // ==========================================
    // Get Apartment By Id
    // ==========================================

    @Override
    public ApartmentResponse getApartmentById(
            Long apartmentId
    ) {

        User propertyAdmin =
                currentUserService.getCurrentUser();

        Apartment apartment = apartmentRepository
                .findByIdAndPropertyAdmin(
                        apartmentId,
                        propertyAdmin
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Apartment not found with id: " + apartmentId
                        ));

        return buildResponse(apartment);

    }

    // ==========================================
    // Get All Apartments
    // ==========================================

    @Override
    public List<ApartmentSummaryResponse> getAllApartments() {

        User propertyAdmin =
                currentUserService.getCurrentUser();

        return apartmentRepository
                .findAllByPropertyAdmin(propertyAdmin)
                .stream()
                .map(apartment ->

                        ApartmentSummaryResponse.builder()
                                .id(apartment.getId())
                                .apartmentName(apartment.getApartmentName())
                                .city(apartment.getCity())
                                .state(apartment.getState())
                                .totalBuildings(
                                        buildingRepository.countByApartment(apartment)
                                )
                                .build()

                )
                .toList();

    }

    // ==========================================
    // Update Apartment
    // ==========================================

    @Override
    public ApartmentResponse updateApartment(
            Long apartmentId,
            ApartmentUpdateRequest request
    ) {

        User propertyAdmin =
                currentUserService.getCurrentUser();

        Apartment apartment = apartmentRepository
                .findByIdAndPropertyAdmin(
                        apartmentId,
                        propertyAdmin
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Apartment not found with id: " + apartmentId
                        ));

        if (apartmentRepository
                .existsByApartmentNameIgnoreCaseAndPincodeAndPropertyAdminAndIdNot(
                        request.getApartmentName(),
                        request.getPincode(),
                        propertyAdmin,
                        apartmentId
                )) {

            throw new DuplicateResourceException(
                    "Another apartment already exists with the same name and pincode."
            );

        }

        apartmentMapper.updateEntity(
                apartment,
                request
        );

        Apartment updatedApartment =
                apartmentRepository.save(apartment);

        return buildResponse(updatedApartment);

    }

    // ==========================================
    // Delete Apartment
    // ==========================================

    @Override
    public void deleteApartment(
            Long apartmentId
    ) {

        User propertyAdmin =
                currentUserService.getCurrentUser();

        Apartment apartment = apartmentRepository
                .findByIdAndPropertyAdmin(
                        apartmentId,
                        propertyAdmin
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Apartment not found with id: " + apartmentId
                        ));

        apartmentRepository.delete(apartment);

    }

    // ==========================================
    // Entity -> Response
    // ==========================================

    private ApartmentResponse buildResponse(
            Apartment apartment
    ) {

        return ApartmentResponse.builder()
                .id(apartment.getId())
                .apartmentName(apartment.getApartmentName())
                .addressLine1(apartment.getAddressLine1())
                .addressLine2(apartment.getAddressLine2())
                .city(apartment.getCity())
                .state(apartment.getState())
                .pincode(apartment.getPincode())
                .totalBuildings(
                        buildingRepository.countByApartment(apartment)
                )
                .createdAt(apartment.getCreatedAt())
                .updatedAt(apartment.getUpdatedAt())
                .build();

    }

}