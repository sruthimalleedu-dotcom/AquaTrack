package com.aquatrack_backend.controller;

import com.aquatrack_backend.dto.AuthResponse;
import com.aquatrack_backend.dto.RegisterRequest;
import com.aquatrack_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController // Marks this class as a REST API controller
@RequestMapping("/api/auth") // Base URL for all APIs in this controller
@RequiredArgsConstructor // Creates constructor for final fields
public class AuthController {

    // Calls business logic from AuthService
    private final AuthService authService;

    @PostMapping("/register") // Handles POST /api/auth/register
    public AuthResponse register(@RequestBody RegisterRequest request) {

        // Pass the request to the service and return the response
        return authService.register(request);
    }
}