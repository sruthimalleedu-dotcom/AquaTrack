package com.aquatrack.entity;

import com.aquatrack.enums.PaymentMethod;
import com.aquatrack.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "waterBill")
@EqualsAndHashCode(exclude = "waterBill")
public class Payment {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Water Bill Relationship
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "water_bill_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_payment_water_bill")
    )
    private WaterBill waterBill;

    // ==========================================
    // Payment Information
    // ==========================================

    @Column(
            name = "amount",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "payment_method",
            nullable = false,
            length = 30
    )
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(
            name = "payment_status",
            nullable = false,
            length = 20
    )
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(
            name = "transaction_id",
            length = 150,
            unique = true
    )
    private String transactionId;

    @Column(
            name = "payment_date",
            nullable = false
    )
    private LocalDate paymentDate;

    @Column(
            name = "remarks",
            length = 500
    )
    private String remarks;

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

        if (paymentDate == null) {
            paymentDate = LocalDate.now();
        }

        if (paymentStatus == null) {
            paymentStatus = PaymentStatus.PENDING;
        }

    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

}