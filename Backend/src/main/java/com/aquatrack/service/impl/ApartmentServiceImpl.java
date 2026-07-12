package com.aquatrack.service.impl;

import com.aquatrack.dto.apartment.*;
import com.aquatrack.entity.Apartment;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.ApartmentMapper;
import com.aquatrack.repository.ApartmentRepository;
import com.aquatrack.service.ApartmentService;
import com.aquatrack.entity.User;
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

    private final ApartmentMapper apartmentMapper;

    private final CurrentUserService currentUserService;

    @Override
    public ApartmentResponse createApartment(
            ApartmentCreateRequest request) {

        // ==========================================
        // Get Logged-in Property Admin
        // ==========================================

        User propertyAdmin =
                currentUserService.getCurrentUser();

        // ==========================================
        // Check Duplicate Apartment
        // ==========================================

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

        // ==========================================
        // Convert DTO -> Entity
        // ==========================================

        Apartment apartment =
                apartmentMapper.toEntity(request);

        // ==========================================
        // Assign Property Admin
        // ==========================================

        apartment.setPropertyAdmin(propertyAdmin);

        // ==========================================
        // Save Apartment
        // ==========================================

        Apartment savedApartment =
                apartmentRepository.save(apartment);

        // ==========================================
        // Convert Entity -> Response
        // ==========================================

        return apartmentMapper.toResponse(savedApartment);

    }

    @Override
    public ApartmentResponse getApartmentById(Long apartmentId) {

        // ==========================================
        // Find Apartment
        // ==========================================

        // ==========================================
        // Get Logged-in Property Admin
        // ==========================================

        User propertyAdmin =
                currentUserService.getCurrentUser();

        // ==========================================
        // Find Apartment
        // ==========================================

        Apartment apartment = apartmentRepository
                .findByIdAndPropertyAdmin(
                        apartmentId,
                        propertyAdmin
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Apartment not found with id: " + apartmentId
                        ));
        // ==========================================
        // Convert Entity -> Response
        // ==========================================

        return apartmentMapper.toResponse(apartment);

    }

    @Override
    public List<ApartmentSummaryResponse> getAllApartments() {

        // ==========================================
        // Get Logged-in Property Admin
        // ==========================================

        User propertyAdmin =
                currentUserService.getCurrentUser();

        // ==========================================
        // Fetch Only Current Property Admin Apartments
        // ==========================================

        return apartmentRepository
                .findAllByPropertyAdmin(propertyAdmin)
                .stream()
                .map(apartmentMapper::toSummaryResponse)
                .toList();

    }

    @Override
    public ApartmentResponse updateApartment(
            Long apartmentId,
            ApartmentUpdateRequest request) {

        // ==========================================
        // Get Logged-in Property Admin
        // ==========================================

        User propertyAdmin =
                currentUserService.getCurrentUser();

        // ==========================================
        // Find Apartment
        // ==========================================

        Apartment apartment = apartmentRepository
                .findByIdAndPropertyAdmin(
                        apartmentId,
                        propertyAdmin
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Apartment not found with id: " + apartmentId
                        ));

        // ==========================================
        // Check Duplicate Apartment
        // ==========================================

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

        // ==========================================
        // Update Entity
        // ==========================================

        apartmentMapper.updateEntity(
                apartment,
                request
        );

        // ==========================================
        // Save Updated Apartment
        // ==========================================

        Apartment updatedApartment =
                apartmentRepository.save(apartment);

        // ==========================================
        // Convert Entity -> Response
        // ==========================================

        return apartmentMapper.toResponse(updatedApartment);

    }

    @Override
    public void deleteApartment(
            Long apartmentId) {

        // ==========================================
        // Get Logged-in Property Admin
        // ==========================================

        User propertyAdmin =
                currentUserService.getCurrentUser();

        // ==========================================
        // Find Apartment
        // ==========================================

        Apartment apartment = apartmentRepository
                .findByIdAndPropertyAdmin(
                        apartmentId,
                        propertyAdmin
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Apartment not found with id: " + apartmentId
                        ));

        // ==========================================
        // Delete Apartment
        // ==========================================

        apartmentRepository.delete(apartment);

    }
}
