package com.aquatrack_backend.service;

import com.aquatrack_backend.entity.RegistrationRequest;
import com.aquatrack_backend.repository.RegistrationRequestRepo;
import org.springframework.stereotype.Service;
import com.aquatrack_backend.dto.RegistrationRequestDTO;
import com.aquatrack_backend.entity.RequestStatus;

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
}