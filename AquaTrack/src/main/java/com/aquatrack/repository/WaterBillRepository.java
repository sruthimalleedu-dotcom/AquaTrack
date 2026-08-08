package com.aquatrack.repository;

import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.WaterBill;
import com.aquatrack.enums.BillStatus;
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

}