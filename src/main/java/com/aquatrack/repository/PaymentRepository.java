package com.aquatrack.repository;

import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.Payment;
import com.aquatrack.entity.WaterBill;
import com.aquatrack.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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

}