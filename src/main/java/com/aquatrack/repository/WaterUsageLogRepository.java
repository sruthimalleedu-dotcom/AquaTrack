package com.aquatrack.repository;

import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.WaterUsageLog;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
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

    // ==========================================
// Manager Dashboard
// ==========================================

    /**
     * Returns total water consumption of all
     * households belonging to the given buildings.
     */
    @Query("""
    SELECT COALESCE(SUM(w.waterUsage), 0)
    FROM WaterUsageLog w
    WHERE w.household.floor.building IN :buildings
    """)
    BigDecimal getTotalWaterConsumption(
            @Param("buildings") List<Building> buildings
    );

    @Query("""
    SELECT
        bc.cycleName,
        COALESCE(SUM(w.waterUsage), 0)
    FROM WaterUsageLog w
    JOIN w.billingCycle bc
    WHERE w.household.floor.building IN :buildings
    GROUP BY bc.cycleName, bc.startDate
    ORDER BY bc.startDate
""")
    List<Object[]> getMonthlyWaterConsumption(
            @Param("buildings") List<Building> buildings
    );

    @Query("""
    SELECT
        b.buildingName,
        COALESCE(SUM(w.waterUsage), 0)
    FROM WaterUsageLog w
    JOIN w.household h
    JOIN h.floor f
    JOIN f.building b
    WHERE b IN :buildings
    GROUP BY b.id, b.buildingName
    ORDER BY b.buildingName
""")
    List<Object[]> getBuildingUsage(
            @Param("buildings") List<Building> buildings
    );

    @Query("""
    SELECT
        h.houseNumber,
        b.buildingName,
        COALESCE(SUM(w.waterUsage),0)
    FROM WaterUsageLog w
    JOIN w.household h
    JOIN h.floor f
    JOIN f.building b
    WHERE b IN :buildings
    GROUP BY
        h.id,
        h.houseNumber,
        b.buildingName
    ORDER BY
        SUM(w.waterUsage) DESC
""")
    List<Object[]> getTopConsumers(
            @Param("buildings") List<Building> buildings
    );

}