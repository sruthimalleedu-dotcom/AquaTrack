package com.aquatrack.repository;

import com.aquatrack.entity.Building;
import com.aquatrack.entity.ManagerBuilding;
import com.aquatrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerBuildingRepository
        extends JpaRepository<ManagerBuilding, Long> {

    // ==========================================
    // Find Assignments
    // ==========================================

    /**
     * Returns all building assignments of a manager.
     */
    List<ManagerBuilding> findByManager(User manager);

    /**
     * Returns all manager assignments of a building.
     */
    List<ManagerBuilding> findByBuilding(Building building);

    /**
     * Returns all assignments for a manager.
     */
    List<ManagerBuilding> findByManagerId(Long managerId);

    /**
     * Returns all assignments for a building.
     */
    List<ManagerBuilding> findByBuildingId(Long buildingId);

    // ==========================================
    // Validation
    // ==========================================

    /**
     * Checks whether a manager is already assigned
     * to a building.
     */
    boolean existsByManagerAndBuilding(
            User manager,
            Building building
    );

    /**
     * Checks whether a manager is already assigned
     * to a building using IDs.
     */
    boolean existsByManagerIdAndBuildingId(
            Long managerId,
            Long buildingId
    );

    // ==========================================
    // Delete
    // ==========================================

    /**
     * Removes all building assignments
     * of a manager.
     */
    void deleteByManager(User manager);

    /**
     * Removes a single building assignment.
     */
    void deleteByManagerAndBuilding(
            User manager,
            Building building
    );

}
