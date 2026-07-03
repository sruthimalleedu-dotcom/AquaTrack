package com.aquatrack.repository;

import com.aquatrack.entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApartmentRepository extends JpaRepository<Apartment, Long> {

    // ==========================================
    // Create Validation
    // ==========================================

    boolean existsByApartmentNameIgnoreCaseAndPincode(
            String apartmentName,
            String pincode
    );

    Optional<Apartment> findByApartmentNameIgnoreCaseAndPincode(
            String apartmentName,
            String pincode
    );

    // ==========================================
    // Update Validation
    // ==========================================

    boolean existsByApartmentNameIgnoreCaseAndPincodeAndIdNot(
            String apartmentName,
            String pincode,
            Long id
    );

}
