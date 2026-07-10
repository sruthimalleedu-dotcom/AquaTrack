package com.aquatrack_backend.repository;

import com.aquatrack_backend.entity.RegistrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegistrationRequestRepo extends JpaRepository<RegistrationRequest, Long> {

    Optional<RegistrationRequest> findByEmail(String email);

    boolean existsByEmail(String email);
}