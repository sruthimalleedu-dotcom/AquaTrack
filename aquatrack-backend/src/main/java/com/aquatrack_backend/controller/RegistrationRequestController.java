package com.aquatrack_backend.controller;

import com.aquatrack_backend.entity.RegistrationRequest;
import com.aquatrack_backend.service.RegistrationRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.aquatrack_backend.dto.RegistrationRequestDTO;

//Handles Resident Owner registration requests.
 
@RestController
@RequestMapping("/api/registration")
public class RegistrationRequestController {

    // Service for registration request operations
    private final RegistrationRequestService requestService;

    // Constructor Injection
    public RegistrationRequestController(RegistrationRequestService requestService) {
        this.requestService = requestService;
    }


    //Submit a new registration request.
    
    @PostMapping("/submit")
    public ResponseEntity<RegistrationRequest> submitRequest(
            @RequestBody RegistrationRequestDTO request) {
        
            System.out.println("========== REGISTRATION API HIT ==========");
        
            RegistrationRequest savedRequest = requestService.submit(request);

        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }
}