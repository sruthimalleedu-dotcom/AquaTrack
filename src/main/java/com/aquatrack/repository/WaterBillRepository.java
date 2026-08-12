package com.aquatrack.repository;

import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.WaterBill;
import com.aquatrack.enums.BillStatus;
import com.aquatrack.entity.Building;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WaterBillRepository extends JpaRepository<WaterBill, Long> {

    // ==========================================
    // Find by Household & Billing Cycle
    // ==========================================

    Optional<WaterBill> findByHouseholdAndBillingCycle(
            Household household,
            BillingCycle billingCycle
    );

    // ==========================================
    // Find All Bills by Billing Cycle
    // ==========================================

    List<WaterBill> findByBillingCycle(BillingCycle billingCycle);

    // ==========================================
    // Find All Bills by Household
    // ==========================================

    List<WaterBill> findByHousehold(Household household);

    // ==========================================
    // Find Bills by Status
    // ==========================================

    List<WaterBill> findByBillStatus(BillStatus billStatus);

    // ==========================================
    // Exists Check
    // ==========================================

    boolean existsByHouseholdAndBillingCycle(
            Household household,
            BillingCycle billingCycle
    );

    // ==========================================
    // Find by Invoice Number
    // ==========================================

    Optional<WaterBill> findByInvoiceNumber(String invoiceNumber);

    // ==========================================
// Manager Dashboard
// ==========================================

    /**
     * Returns total bills of the given buildings.
     */
    long countByHousehold_Floor_BuildingIn(
            List<Building> buildings
    );

    /**
     * Returns total paid bills of the given buildings.
     */
    long countByHousehold_Floor_BuildingInAndBillStatus(
            List<Building> buildings,
            BillStatus billStatus
    );

    /**
     * Returns total pending amount of all unpaid bills.
     */
    @Query("""
    SELECT COALESCE(SUM(w.totalAmount), 0)
    FROM WaterBill w
    WHERE w.household.floor.building IN :buildings
      AND w.billStatus = :status
    """)
    java.math.BigDecimal getPendingAmount(
            @Param("buildings") List<Building> buildings,
            @Param("status") BillStatus status
    );

    @Query("""
    SELECT
        wb.invoiceNumber,
        h.houseNumber,
        b.buildingName,
        wb.totalAmount,
        wb.dueDate,
        wb.billStatus
    FROM WaterBill wb
    JOIN wb.household h
    JOIN h.floor f
    JOIN f.building b
    WHERE b IN :buildings
    ORDER BY wb.createdAt DESC
""")
    List<Object[]> getRecentBills(
            @Param("buildings") List<Building> buildings
    );





}