package com.aquatrack.repository;

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

    // ==========================
    // Exists Methods
    // ==========================

    /**
     * Checks whether a building name already exists
     * within the given apartment.
     */
    boolean existsByApartmentIdAndBuildingNameIgnoreCase(
            Long apartmentId,
            String buildingName
    );

    /**
     * Checks whether a building code already exists
     * within the given apartment.
     */
    boolean existsByApartmentIdAndBuildingCodeIgnoreCase(
            Long apartmentId,
            String buildingCode
    );

    /**
     * Checks whether another building with the same name
     * exists while updating.
     */
    boolean existsByApartmentIdAndBuildingNameIgnoreCaseAndIdNot(
            Long apartmentId,
            String buildingName,
            Long id
    );

    /**
     * Checks whether another building with the same code
     * exists while updating.
     */
    boolean existsByApartmentIdAndBuildingCodeIgnoreCaseAndIdNot(
            Long apartmentId,
            String buildingCode,
            Long id
    );

    // ==========================
    // Find Methods
    // ==========================

    /**
     * Returns all buildings of an apartment.
     */
    List<Building> findByApartmentId(Long apartmentId);

    /**
     * Returns a building by building id and apartment id.
     */
    Optional<Building> findByIdAndApartmentId(
            Long id,
            Long apartmentId
    );

}