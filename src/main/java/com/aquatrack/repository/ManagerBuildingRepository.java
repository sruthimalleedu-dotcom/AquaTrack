package com.aquatrack.repository;

import com.aquatrack.entity.Building;
import com.aquatrack.entity.ManagerBuilding;
import com.aquatrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ManagerBuildingRepository
        extends JpaRepository<ManagerBuilding, Long> {

    // ==========================================
    // Find Assignments
    // ==========================================

    /**
     * Returns all building assignments of a manager.
     */
    List<ManagerBuilding> findByManager(
            User manager
    );

    /**
     * Returns all manager assignments of a building.
     */
    List<ManagerBuilding> findByBuilding(
            Building building
    );

    /**
     * Returns all assignments for a manager.
     */
    List<ManagerBuilding> findByManagerId(
            Long managerId
    );

    /**
     * Returns all assignments for a building.
     */
    List<ManagerBuilding> findByBuildingId(
            Long buildingId
    );

    /**
     * Returns a specific assignment.
     */
    Optional<ManagerBuilding> findByManagerAndBuilding(
            User manager,
            Building building
    );

    /**
     * Returns a specific assignment using IDs.
     */
    Optional<ManagerBuilding> findByManagerIdAndBuildingId(
            Long managerId,
            Long buildingId
    );

    // ==========================================
    // Validation
    // ==========================================

    /**
     * Checks whether a manager is assigned
     * to a building.
     */
    boolean existsByManagerAndBuilding(
            User manager,
            Building building
    );

    /**
     * Checks whether a manager is assigned
     * to a building using IDs.
     */
    boolean existsByManagerIdAndBuildingId(
            Long managerId,
            Long buildingId
    );

    /**
     * Checks whether a building has
     * at least one manager.
     */
    boolean existsByBuilding(
            Building building
    );

    /**
     * Checks whether a manager has
     * at least one assigned building.
     */
    boolean existsByManager(
            User manager
    );

    // ==========================================
    // Delete
    // ==========================================

    /**
     * Removes all building assignments
     * of a manager.
     */
    void deleteByManager(
            User manager
    );

    /**
     * Removes all manager assignments
     * of a building.
     */
    void deleteByBuilding(
            Building building
    );

    /**
     * Removes a single building assignment.
     */
    void deleteByManagerAndBuilding(
            User manager,
            Building building
    );

}