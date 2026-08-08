package com.aquatrack.repository;

import com.aquatrack.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    Optional<Invoice> findTopByHouseholdIdOrderByCreatedAtDesc(Long householdId);
    List<Invoice> findByHouseholdIdOrderByCreatedAtDesc(Long householdId);
}