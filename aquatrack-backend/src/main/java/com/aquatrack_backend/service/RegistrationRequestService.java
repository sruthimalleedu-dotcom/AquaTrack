package com.aquatrack_backend.service;

import com.aquatrack_backend.entity.RegistrationRequest;
import com.aquatrack_backend.repository.RegistrationRequestRepo;
import org.springframework.stereotype.Service;
import com.aquatrack_backend.dto.RegistrationRequestDTO;
import com.aquatrack_backend.entity.RequestStatus;
import com.aquatrack_backend.dto.RegistrationStatusResponse;
import java.util.NoSuchElementException;
import com.aquatrack_backend.dto.ResidentProfileDTO;

//Handles Resident Owner registration requests.
@Service
public class RegistrationRequestService {

    // Repository for database operations
    private final RegistrationRequestRepo requestRepo;

    // Constructor Injection
    public RegistrationRequestService(RegistrationRequestRepo requestRepo) {
        this.requestRepo = requestRepo;
    }

    public RegistrationRequest submit(RegistrationRequestDTO dto) {

        if(requestRepo.existsByEmail(dto.getEmail())){
            throw new RuntimeException("Request already submitted.");
        }

        RegistrationRequest request = RegistrationRequest.builder()
            .fullName(dto.getFullName())
            .email(dto.getEmail())
            .phone(dto.getPhone())
            .buildingName(dto.getBuildingName())
            .apartmentNumber(dto.getApartmentNumber())
            .status(RequestStatus.PENDING)
            .build();

        return requestRepo.save(request);
    }

    public RegistrationStatusResponse getStatus(String email) {

        RegistrationRequest request = requestRepo.findByEmail(email)
                .orElseThrow(() ->
                        new NoSuchElementException("Registration request not found"));

        return new RegistrationStatusResponse(request.getStatus());
    }

    /**
    * Fetches the profile details of a resident
    * using the registered email.
    *
    * param email Resident's registered email
    * return ResidentProfileDTO containing profile details
    */
    public ResidentProfileDTO getProfile(String email) {

        // Search registration request by email
        RegistrationRequest request = requestRepo.findByEmail(email)

                // Throw exception if resident is not found
                .orElseThrow(() ->
                        new RuntimeException("Resident not found."));

        // Convert Entity into DTO
        return new ResidentProfileDTO(

                request.getFullName(),
                request.getEmail(),
                request.getPhone(),
                request.getBuildingName(),
                request.getApartmentNumber()
        );
    }
}