package com.aquatrack.repository;

import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.WaterUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WaterUsageLogRepository extends JpaRepository<WaterUsageLog, Long> {

    /**
     * Duplicate detection.
     * One reading per household per day.
     */
    boolean existsByHouseholdAndReadingDate(
            Household household,
            LocalDate readingDate
    );

    /**
     * Get all readings of a household.
     */
    List<WaterUsageLog> findByHouseholdOrderByReadingDateDesc(
            Household household
    );

    /**
     * Get all readings of a billing cycle.
     */
    List<WaterUsageLog> findByBillingCycle(
            BillingCycle billingCycle
    );

    /**
     * Get all readings of a billing cycle ordered by date.
     */
    List<WaterUsageLog> findByBillingCycleOrderByReadingDateAsc(
            BillingCycle billingCycle
    );

    /**
     * Latest reading of a household.
     */
    Optional<WaterUsageLog> findTopByHouseholdOrderByReadingDateDesc(
            Household household
    );

    /**
     * Reading by household and date.
     */
    Optional<WaterUsageLog> findByHouseholdAndReadingDate(
            Household household,
            LocalDate readingDate
    );

    /**
     * Reading history within a billing cycle.
     */
    List<WaterUsageLog> findByHouseholdAndBillingCycleOrderByReadingDateAsc(
            Household household,
            BillingCycle billingCycle
    );

    /**
     * Get household reading within a billing cycle.
     */
    Optional<WaterUsageLog> findByHouseholdAndBillingCycle(
            Household household,
            BillingCycle billingCycle
    );

    /**
     * Check whether a household already has
     * a reading in a billing cycle.
     */
    boolean existsByHouseholdAndBillingCycle(
            Household household,
            BillingCycle billingCycle
    );

    // ==========================================
// Consumption Distribution
// ==========================================

    /**
     * Get all water usage logs of a building
     * for a billing cycle.
     */
    List<WaterUsageLog> findByBillingCycleAndHousehold_Floor_Building(
            BillingCycle billingCycle,
            Building building
    );

    /**
     * Get all water usage logs of a building
     * for a billing cycle ordered by house number.
     */
    List<WaterUsageLog> findByBillingCycleAndHousehold_Floor_BuildingOrderByHousehold_HouseNumberAsc(
            BillingCycle billingCycle,
            Building building
    );

}