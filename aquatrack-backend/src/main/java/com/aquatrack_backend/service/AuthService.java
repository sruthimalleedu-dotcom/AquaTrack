package com.aquatrack_backend.service;

import com.aquatrack_backend.dto.AuthResponse;
import com.aquatrack_backend.dto.RegisterRequest;
import com.aquatrack_backend.entity.User;
import com.aquatrack_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service // Marks this class as a Service component
@RequiredArgsConstructor // Creates a constructor for final fields automatically
public class AuthService {

    // Repository to perform database operations
    private final UserRepository userRepository;

    // Used to encrypt passwords before saving
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {

        // Check if username is already taken
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Create a new User object from the request
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword())) // Encrypt password
                .role(request.getRole())
                .build();

        // Save the user in the database
        userRepository.save(user);

        // Return success response
        return new AuthResponse("User Registered Successfully");
    }
}