package com.aquatrack.repository;

import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Building entity.
 *
 * Handles all database operations related to buildings.
 */
@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {

    // ==========================================
    // Exists Validation
    // ==========================================

    /**
     * Check duplicate building name inside an apartment.
     */
    boolean existsByApartmentIdAndBuildingNameIgnoreCase(
            Long apartmentId,
            String buildingName
    );

    /**
     * Check duplicate building code inside an apartment.
     */
    boolean existsByApartmentIdAndBuildingCodeIgnoreCase(
            Long apartmentId,
            String buildingCode
    );

    /**
     * Check duplicate building name while updating.
     */
    boolean existsByApartmentIdAndBuildingNameIgnoreCaseAndIdNot(
            Long apartmentId,
            String buildingName,
            Long id
    );

    /**
     * Check duplicate building code while updating.
     */
    boolean existsByApartmentIdAndBuildingCodeIgnoreCaseAndIdNot(
            Long apartmentId,
            String buildingCode,
            Long id
    );

    // ==========================================
    // Find Methods
    // ==========================================

    /**
     * Get all buildings of an apartment.
     */
    List<Building> findByApartmentId(
            Long apartmentId
    );

    /**
     * Find building by apartment and building id.
     */
    Optional<Building> findByIdAndApartmentId(
            Long id,
            Long apartmentId
    );

    /**
     * Get all buildings of an apartment.
     */
    List<Building> findByApartment(
            Apartment apartment
    );

    // ==========================================
    // Dashboard Statistics
    // ==========================================

    /**
     * Total buildings of one apartment.
     */
    long countByApartment(
            Apartment apartment
    );

    /**
     * Total buildings using apartment id.
     */
    long countByApartmentId(
            Long apartmentId
    );

    /**
     * Total buildings across multiple apartments.
     */
    long countByApartmentIn(
            List<Apartment> apartments
    );

}