package com.aquatrack.repository;

import com.aquatrack.entity.PropertyRegistrationRequest;
import com.aquatrack.enums.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PropertyRegistrationRequestRepository
        extends JpaRepository<PropertyRegistrationRequest, Long> {

    // ==========================================
    // Validation
    // ==========================================

    boolean existsByEmailIgnoreCase(String email);

    Optional<PropertyRegistrationRequest> findByEmailIgnoreCase(String email);

    // ==========================================
    // Super Admin Dashboard
    // ==========================================

    List<PropertyRegistrationRequest> findByStatus(
            RegistrationStatus status
    );

    long countByStatus(
            RegistrationStatus status
    );

}