package com.aquatrack.repository;

import com.aquatrack.entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aquatrack.entity.User;

import java.util.List;
import java.util.Optional;

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

    // ==========================================
    // Property Admin Ownership
    // ==========================================

    List<Apartment> findAllByPropertyAdmin(
            User propertyAdmin
    );

    Optional<Apartment> findByIdAndPropertyAdmin(
            Long id,
            User propertyAdmin
    );

    boolean existsByApartmentNameIgnoreCaseAndPincodeAndPropertyAdmin(
            String apartmentName,
            String pincode,
            User propertyAdmin
    );

    boolean existsByApartmentNameIgnoreCaseAndPincodeAndPropertyAdminAndIdNot(
            String apartmentName,
            String pincode,
            User propertyAdmin,
            Long id
    );

    // ==========================================
    // Property Admin Dashboard
    // ==========================================

    long countByPropertyAdmin(
            User propertyAdmin
    );

}
