package com.aquatrack.repository;

import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Building;
import com.aquatrack.enums.BillingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BillingCycleRepository extends JpaRepository<BillingCycle, Long> {

    // ==========================================
    // Building
    // ==========================================

    /**
     * Returns all billing cycles of a building.
     */
    List<BillingCycle> findByBuilding(
            Building building
    );

    /**
     * Returns billing cycles of a building by status.
     */
    List<BillingCycle> findByBuildingAndBillingStatus(
            Building building,
            BillingStatus billingStatus
    );

    // ==========================================
    // Billing Cycle
    // ==========================================

    /**
     * Returns a billing cycle by name within a building.
     */
    Optional<BillingCycle> findByBuildingAndCycleName(
            Building building,
            String cycleName
    );

    /**
     * Checks duplicate billing cycle name.
     */
    boolean existsByBuildingAndCycleName(
            Building building,
            String cycleName
    );

    /**
     * Checks duplicate billing cycle name while updating.
     */
    boolean existsByBuildingAndCycleNameAndIdNot(
            Building building,
            String cycleName,
            Long id
    );

    // ==========================================
    // Active Billing Cycle
    // ==========================================

    /**
     * Returns the billing cycle that contains
     * the given reading date.
     *
     * Used by Water Usage module.
     */
    Optional<BillingCycle> findByBuildingAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Building building,
            LocalDate readingDate,
            LocalDate readingDateAgain
    );

    // ==========================================
    // Billing Cycle Overlap Validation
    // ==========================================

    /**
     * Checks whether another billing cycle overlaps
     * the given date range.
     */
    boolean existsByBuildingAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Building building,
            LocalDate endDate,
            LocalDate startDate
    );

    /**
     * Checks overlap while excluding
     * the current billing cycle.
     */
    boolean existsByBuildingAndStartDateLessThanEqualAndEndDateGreaterThanEqualAndIdNot(
            Building building,
            LocalDate endDate,
            LocalDate startDate,
            Long id
    );

}