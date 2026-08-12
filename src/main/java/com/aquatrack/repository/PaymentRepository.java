package com.aquatrack.repository;

import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.Payment;
import com.aquatrack.entity.WaterBill;
import com.aquatrack.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // ==========================================
    // Find Payments By Water Bill
    // ==========================================

    List<Payment> findByWaterBill(
            WaterBill waterBill
    );

    // ==========================================
    // Find Payments By Household
    // ==========================================

    List<Payment> findByWaterBill_Household(
            Household household
    );

    // ==========================================
    // Find Payments By Building
    // ==========================================

    List<Payment> findByWaterBill_Household_Floor_Building(
            Building building
    );

    // ==========================================
    // Find Payments By Apartment
    // ==========================================

    List<Payment> findByWaterBill_Household_Apartment(
            Apartment apartment
    );

    // ==========================================
    // Find Payments By Status
    // ==========================================

    List<Payment> findByPaymentStatus(
            PaymentStatus paymentStatus
    );

    // ==========================================
    // Find Payments By Building And Status
    // ==========================================

    List<Payment> findByWaterBill_Household_Floor_BuildingAndPaymentStatus(
            Building building,
            PaymentStatus paymentStatus
    );

    // ==========================================
    // Find Payments By Apartment And Status
    // ==========================================

    List<Payment> findByWaterBill_Household_ApartmentAndPaymentStatus(
            Apartment apartment,
            PaymentStatus paymentStatus
    );

    // ==========================================
    // Find Payment By Transaction ID
    // ==========================================

    Optional<Payment> findByTransactionId(
            String transactionId
    );

    // ==========================================
    // Exists By Transaction ID
    // ==========================================

    boolean existsByTransactionId(
            String transactionId
    );

    // ==========================================
// Manager Dashboard
// ==========================================

    /**
     * Returns monthly revenue collected for
     * all buildings assigned to the manager.
     */
    @Query("""
    SELECT
        wb.billingCycle.cycleName,
        COALESCE(SUM(p.amount), 0)
    FROM Payment p
    JOIN p.waterBill wb
    WHERE wb.household.floor.building IN :buildings
      AND p.paymentStatus = :status
    GROUP BY
        wb.billingCycle.cycleName,
        wb.billingCycle.startDate
    ORDER BY
        wb.billingCycle.startDate
""")
    List<Object[]> getMonthlyRevenueTrend(
            @Param("buildings") List<Building> buildings,
            @Param("status") PaymentStatus status
    );

    @Query("""
    SELECT
        p.transactionId,
        wb.invoiceNumber,
        h.houseNumber,
        CONCAT(u.firstName, ' ', u.lastName),
        p.paymentMethod,
        p.amount,
        p.paymentStatus,
        p.paymentDate
    FROM Payment p
    JOIN p.waterBill wb
    JOIN wb.household h
    JOIN h.floor f
    JOIN f.building b
    JOIN wb.household.users u
    WHERE b IN :buildings
      AND u.role = com.aquatrack.enums.UserRole.RESIDENT
    ORDER BY p.paymentDate DESC
""")
    List<Object[]> getRecentPayments(
            @Param("buildings") List<Building> buildings
    );
}