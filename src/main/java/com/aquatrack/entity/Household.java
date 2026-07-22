package com.aquatrack.entity;

import com.aquatrack.enums.HouseholdStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "households",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_household_floor_house_number",
                        columnNames = {"floor_id", "house_number"}
                )
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {
        "apartment",
        "floor",
        "users",
        "waterUsageLogs"
})
@EqualsAndHashCode(exclude = {
        "apartment",
        "floor",
        "users",
        "waterUsageLogs"
})
public class Household {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Parent Relationships
    // ==========================================

    /**
     * Apartment to which this household belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "apartment_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_household_apartment")
    )
    private Apartment apartment;

    /**
     * Floor to which this household belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "floor_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_household_floor")
    )
    private Floor floor;

    // ==========================================
    // Household Information
    // ==========================================

    @Column(name = "house_number", nullable = false, length = 20)
    private String houseNumber;

    /**
     * Temporary field.
     * This will be removed after introducing
     * the Water Meter module.
     */
    @Column(name = "meter_number", nullable = false, unique = true, length = 100)
    private String meterNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private HouseholdStatus status = HouseholdStatus.VACANT;

    // ==========================================
    // Child Relationships
    // ==========================================

    /**
     * Users belonging to this household.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "household",
            fetch = FetchType.LAZY
    )
    private List<User> users = new ArrayList<>();

    /**
     * Water usage logs of this household.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "household",
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

        if (status == null) {
            status = HouseholdStatus.VACANT;
        }

    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

}