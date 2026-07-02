package com.aquatrack.repository;

import com.aquatrack.entity.WaterUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaterUsageLogRepository extends JpaRepository<WaterUsageLog, Long> {
}