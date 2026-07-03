package com.aquatrack.service.impl;

import com.aquatrack.dto.apartment.*;
import com.aquatrack.entity.Apartment;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.ApartmentMapper;
import com.aquatrack.repository.ApartmentRepository;
import com.aquatrack.service.ApartmentService;
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


    @Override
    public ApartmentResponse createApartment(
            ApartmentCreateRequest request) {

        // ==========================================
        // Check Duplicate Apartment
        // ==========================================

        if (apartmentRepository
                .existsByApartmentNameIgnoreCaseAndPincode(
                        request.getApartmentName(),
                        request.getPincode()
                )) {

            throw new DuplicateResourceException(
                    "Apartment already exists with the same name and pincode."
            );

        }

        // ==========================================
        // Convert DTO -> Entity
        // ==========================================

        Apartment apartment = apartmentMapper.toEntity(request);

        // ==========================================
        // Save Apartment
        // ==========================================

        Apartment savedApartment = apartmentRepository.save(apartment);

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

        Apartment apartment = apartmentRepository.findById(apartmentId)
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
        // Fetch All Apartments
        // ==========================================

        return apartmentRepository.findAll()
                .stream()
                .map(apartmentMapper::toSummaryResponse)
                .toList();

    }

    @Override
    public ApartmentResponse updateApartment(
            Long apartmentId,
            ApartmentUpdateRequest request) {

        // ==========================================
        // Find Apartment
        // ==========================================

        Apartment apartment = apartmentRepository.findById(apartmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Apartment not found with id: " + apartmentId
                        ));

        // ==========================================
        // Check Duplicate Apartment
        // ==========================================

        if (apartmentRepository
                .existsByApartmentNameIgnoreCaseAndPincodeAndIdNot(
                        request.getApartmentName(),
                        request.getPincode(),
                        apartmentId
                )) {

            throw new DuplicateResourceException(
                    "Another apartment already exists with the same name and pincode."
            );

        }

        // ==========================================
        // Update Entity
        // ==========================================

        apartmentMapper.updateEntity(apartment, request);

        // ==========================================
        // Save Updated Apartment
        // ==========================================

        Apartment updatedApartment = apartmentRepository.save(apartment);

        // ==========================================
        // Convert Entity -> Response
        // ==========================================

        return apartmentMapper.toResponse(updatedApartment);

    }

    @Override
    public void deleteApartment(Long apartmentId) {

        // ==========================================
        // Find Apartment
        // ==========================================

        Apartment apartment = apartmentRepository.findById(apartmentId)
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
