package com.aquatrack_backend.service;

import com.aquatrack_backend.dto.AuthResponse;
import com.aquatrack_backend.dto.RegisterRequest;
import com.aquatrack_backend.entity.User;
import com.aquatrack_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service // Marks this class as a Service
@RequiredArgsConstructor // Generates constructor for final fields
public class AuthService {

    // Repository used to save and fetch users
    private final UserRepository userRepository;

    // Used to encrypt passwords before storing them
    private final PasswordEncoder passwordEncoder;

    /**
     * Registers a new user in the database.
     */
    public AuthResponse register(RegisterRequest request) {

        // Check if the username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse("Username already exists.");
        }

        // Create User object using Builder pattern
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        // Save user into database
        userRepository.save(user);

        // Return success response
        return new AuthResponse("User registered successfully.");
    }
}