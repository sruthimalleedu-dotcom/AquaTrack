package com.aquatrack.entity;

import com.aquatrack.enums.BillingStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "billing_cycles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {
        "building",
        "waterUsageLogs",
        "waterBills"
})
@EqualsAndHashCode(exclude = {
        "building",
        "waterUsageLogs",
        "waterBills"
})
public class BillingCycle {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Parent Relationship
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "building_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_billing_building")
    )
    private Building building;

    // ==========================================
    // Billing Information
    // ==========================================

    @Column(name = "cycle_name", nullable = false, length = 100)
    private String cycleName;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "billing_status", nullable = false, length = 20)
    @Builder.Default
    private BillingStatus billingStatus = BillingStatus.OPEN;

    // ==========================================
    // Child Relationship
    // ==========================================

    @Builder.Default
    @OneToMany(
            mappedBy = "billingCycle",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<WaterUsageLog> waterUsageLogs = new ArrayList<>();

    // ==========================================
    // Audit Fields
    // ==========================================

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // ==========================================
    // Lifecycle Methods
    // ==========================================

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (billingStatus == null) {
            billingStatus = BillingStatus.OPEN;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Builder.Default
    @OneToMany(
            mappedBy = "billingCycle",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<WaterBill> waterBills = new ArrayList<>();

}