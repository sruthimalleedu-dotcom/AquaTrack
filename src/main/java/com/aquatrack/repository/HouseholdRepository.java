package com.aquatrack.repository;

import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Floor;
import com.aquatrack.entity.Household;
import com.aquatrack.enums.HouseholdStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HouseholdRepository extends JpaRepository<Household, Long> {

    // ==========================================
    // Meter Number
    // ==========================================

    Optional<Household> findByMeterNumber(String meterNumber);

    boolean existsByMeterNumber(String meterNumber);

    boolean existsByMeterNumberAndIdNot(
            String meterNumber,
            Long id
    );

    // ==========================================
    // Floor
    // ==========================================

    List<Household> findByFloor(Floor floor);

    Optional<Household> findByFloorAndHouseNumber(
            Floor floor,
            String houseNumber
    );

    boolean existsByFloorAndHouseNumber(
            Floor floor,
            String houseNumber
    );

    boolean existsByFloorAndHouseNumberAndIdNot(
            Floor floor,
            String houseNumber,
            Long id
    );

    // ==========================================
    // Apartment
    // ==========================================

    List<Household> findByApartment(Apartment apartment);

    long countByApartmentIn(
            List<Apartment> apartments
    );

    // ==========================================
    // Building
    // ==========================================

    List<Household> findByFloor_Building(
            Building building
    );

    Optional<Household> findByFloor_BuildingAndHouseNumber(
            Building building,
            String houseNumber
    );

    boolean existsByFloor_BuildingAndHouseNumber(
            Building building,
            String houseNumber
    );

    // ==========================================
// Manager Dashboard
// ==========================================

    long countByFloor_BuildingIn(
            List<Building> buildings
    );

    List<Household> findByFloor_BuildingIn(
            List<Building> buildings
    );

    long countByFloor_BuildingInAndStatus(
            List<Building> buildings,
            HouseholdStatus status
    );

}