package com.aquatrack.entity;

import com.aquatrack.enums.BillStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "water_bills",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_water_bill_household_cycle",
                        columnNames = {
                                "household_id",
                                "billing_cycle_id"
                        }
                )
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {
        "household",
        "billingCycle",
        "payments"
})
@EqualsAndHashCode(exclude = {
        "household",
        "billingCycle",
        "payments"
})
public class WaterBill {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Parent Relationships
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "household_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_bill_household")
    )
    private Household household;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "billing_cycle_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_bill_billing_cycle")
    )
    private BillingCycle billingCycle;

    // ==========================================
    // Payments
    // ==========================================

    @Builder.Default
    @OneToMany(
            mappedBy = "waterBill",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<Payment> payments = new ArrayList<>();

    // ==========================================
    // Consumption Snapshot
    // ==========================================

    @Column(
            name = "consumption_kl",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal consumptionKL;

    @Column(
            name = "usage_percentage",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal usagePercentage;

    // ==========================================
    // Billing Snapshot
    // ==========================================

    @Column(
            name = "cost_per_kl",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal costPerKL;

    @Column(
            name = "shared_water_cost",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal sharedWaterCost;

    @Column(
            name = "tariff_charge",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal tariffCharge;

    @Builder.Default
    @Column(
            name = "adjustment_amount",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal adjustmentAmount = BigDecimal.ZERO;

    @Column(
            name = "total_amount",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal totalAmount;

    // ==========================================
    // Invoice Information
    // ==========================================

    @Column(
            name = "invoice_number",
            nullable = false,
            unique = true,
            length = 100
    )
    private String invoiceNumber;

    @Column(
            name = "generated_date",
            nullable = false
    )
    private LocalDate generatedDate;

    @Column(
            name = "due_date",
            nullable = false
    )
    private LocalDate dueDate;

    // ==========================================
    // Bill Status
    // ==========================================

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(
            name = "bill_status",
            nullable = false,
            length = 20
    )
    private BillStatus billStatus = BillStatus.PENDING;

    // ==========================================
    // Audit Fields
    // ==========================================

    @Column(
            name = "created_at",
            nullable = false,
            updatable = false
    )
    private LocalDateTime createdAt;

    @Column(
            name = "updated_at",
            nullable = false
    )
    private LocalDateTime updatedAt;

    // ==========================================
    // Lifecycle Methods
    // ==========================================

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (generatedDate == null) {
            generatedDate = LocalDate.now();
        }

        if (billStatus == null) {
            billStatus = BillStatus.PENDING;
        }

        if (adjustmentAmount == null) {
            adjustmentAmount = BigDecimal.ZERO;
        }

    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

}