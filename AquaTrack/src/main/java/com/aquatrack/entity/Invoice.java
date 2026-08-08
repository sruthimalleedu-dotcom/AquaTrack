package com.aquatrack.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "invoices")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {
        "household",
        "billingCycle"
})
@EqualsAndHashCode(exclude = {
        "household",
        "billingCycle"
})
public class Invoice {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Relationships
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "household_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_invoice_household")
    )
    private Household household;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "billing_cycle_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_invoice_billing_cycle")
    )
    private BillingCycle billingCycle;

    // ==========================================
    // Invoice Details
    // ==========================================

    @Column(nullable = false)
    private Double consumption;

    @Column(nullable = false)
    private Double baseCharge;

    @Column(nullable = false)
    private Double sharedAllocation;

    @Builder.Default
    @Column(nullable = false)
    private Double adjustments = 0.0;

    @Column(nullable = false)
    private Double totalAmount;

    @Builder.Default
    @Column(nullable = false)
    private Boolean paid = false;

    // ==========================================
    // Audit Fields
    // ==========================================

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

/*household	        Kis flat ki invoice hai
billingCycle	    Kis month/cycle ki invoice hai
consumption	        Total water used
baseCharge	        Tariff engine se calculate hua amount
sharedAllocation	Common area water cost
adjustments	        Extra discount/penalty
totalAmount	        Final bill
paid	            Payment status*/