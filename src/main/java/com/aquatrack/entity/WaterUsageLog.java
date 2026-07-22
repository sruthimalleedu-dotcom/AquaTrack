package com.aquatrack.entity;

import com.aquatrack.enums.UploadType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "water_usage_logs",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_household_reading_date",
                        columnNames = {
                                "household_id",
                                "reading_date"
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
        "uploadedBy"
})
@EqualsAndHashCode(exclude = {
        "household",
        "billingCycle",
        "uploadedBy"
})
public class WaterUsageLog {

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
            foreignKey = @ForeignKey(name = "fk_usage_household")
    )
    private Household household;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "billing_cycle_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_usage_billing_cycle")
    )
    private BillingCycle billingCycle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "uploaded_by",
            foreignKey = @ForeignKey(name = "fk_usage_uploaded_by")
    )
    private User uploadedBy;

    // ==========================================
    // Reading Information
    // ==========================================

    @Column(name = "reading_date", nullable = false)
    private LocalDate readingDate;

    @Column(name = "previous_reading", nullable = false, precision = 10, scale = 2)
    private BigDecimal previousReading;

    @Column(name = "current_reading", nullable = false, precision = 10, scale = 2)
    private BigDecimal currentReading;

    @Column(name = "water_usage", nullable = false, precision = 10, scale = 2)
    private BigDecimal waterUsage;

    @Enumerated(EnumType.STRING)
    @Column(name = "upload_type", nullable = false, length = 20)
    @Builder.Default
    private UploadType uploadType = UploadType.MANUAL;

    @Column(name = "remarks", length = 255)
    private String remarks;

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

        if (uploadType == null) {
            uploadType = UploadType.MANUAL;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}