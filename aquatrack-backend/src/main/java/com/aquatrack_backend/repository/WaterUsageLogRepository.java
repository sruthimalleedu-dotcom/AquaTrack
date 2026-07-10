package com.aquatrack_backend.repository;

import com.aquatrack_backend.entity.Household;
import com.aquatrack_backend.entity.WaterUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for Water Usage Logs.
 *
 * Provides CRUD operations and custom queries
 * for fetching water usage records.
 */
public interface WaterUsageLogRepository extends JpaRepository<WaterUsageLog, Long> {

    /**
     * Returns all water usage records
     * belonging to a specific household.
     */
    List<WaterUsageLog> findByHousehold(Household household);

}