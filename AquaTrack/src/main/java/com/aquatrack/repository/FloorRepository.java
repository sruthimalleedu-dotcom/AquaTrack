package com.aquatrack.repository;

import com.aquatrack.entity.Building;
import com.aquatrack.entity.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FloorRepository extends JpaRepository<Floor, Long> {

    // ==========================================
    // Exists Validation
    // ==========================================

    boolean existsByBuildingAndFloorNumber(
            Building building,
            Integer floorNumber
    );

    boolean existsByBuildingAndFloorName(
            Building building,
            String floorName
    );

    boolean existsByBuildingAndFloorNumberAndIdNot(
            Building building,
            Integer floorNumber,
            Long id
    );

    boolean existsByBuildingAndFloorNameAndIdNot(
            Building building,
            String floorName,
            Long id
    );

    // ==========================================
    // Find Methods
    // ==========================================

    List<Floor> findByBuildingOrderByFloorNumberAsc(
            Building building
    );

    Optional<Floor> findByIdAndBuildingId(
            Long floorId,
            Long buildingId
    );

    Optional<Floor> findByBuildingAndFloorNumber(
            Building building,
            Integer floorNumber
    );
}