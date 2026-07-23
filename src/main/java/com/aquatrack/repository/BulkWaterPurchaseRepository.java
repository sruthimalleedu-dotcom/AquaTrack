package com.aquatrack.repository;

import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.BulkWaterPurchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BulkWaterPurchaseRepository extends JpaRepository<BulkWaterPurchase, Long> {

    // Get all purchases for a Building
    List<BulkWaterPurchase> findByBuilding(Building building);

    // Get all purchases for a Billing Cycle
    List<BulkWaterPurchase> findByBillingCycle(BillingCycle billingCycle);

    // Get all purchases for a Building (Latest First)
    List<BulkWaterPurchase> findByBuildingOrderByPurchaseDateDesc(Building building);

    // Find purchase by ID and Building
    Optional<BulkWaterPurchase> findByIdAndBuilding(Long id, Building building);

    // Find purchase by ID and Building ID
    Optional<BulkWaterPurchase> findByIdAndBuildingId(Long id, Long buildingId);

    // Get purchases by Building ID (Latest First)
    List<BulkWaterPurchase> findByBuildingIdOrderByPurchaseDateDesc(Long buildingId);

    // Get purchases by Billing Cycle ID
    List<BulkWaterPurchase> findByBillingCycleId(Long billingCycleId);

    List<BulkWaterPurchase> findByBuildingInOrderByPurchaseDateDesc(
            List<Building> buildings
    );
    /**
     * Get bulk water purchase for a building
     * and billing cycle.
     */
    Optional<BulkWaterPurchase> findByBuildingAndBillingCycle(
            Building building,
            BillingCycle billingCycle
    );

}