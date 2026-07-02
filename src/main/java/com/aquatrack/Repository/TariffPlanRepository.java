package com.aquatrack.repository;

import com.aquatrack.entity.TariffPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TariffPlanRepository extends JpaRepository<TariffPlan, Long> {
}