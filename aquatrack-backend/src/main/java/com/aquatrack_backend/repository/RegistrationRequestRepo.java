package com.aquatrack_backend.repository;

import com.aquatrack_backend.entity.RegistrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegistrationRequestRepo extends JpaRepository<RegistrationRequest, Long> {

    // Find a registration request using email
    Optional<RegistrationRequest> findByEmail(String email);

    // Check if a request with this email already exists
    boolean existsByEmail(String email);

    
}