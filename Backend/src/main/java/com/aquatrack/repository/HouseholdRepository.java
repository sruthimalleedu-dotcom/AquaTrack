package com.aquatrack.repository;

import com.aquatrack.entity.Household;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HouseholdRepository extends JpaRepository<Household, Long> {

    Optional<Household> findByMeterNumber(String meterNumber);

    boolean existsByMeterNumber(String meterNumber);

}