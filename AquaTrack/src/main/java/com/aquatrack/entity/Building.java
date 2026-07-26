package com.aquatrack.entity;

import com.aquatrack.enums.BuildingType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "buildings",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_building_name_per_apartment",
                        columnNames = {"apartment_id", "building_name"}
                ),
                @UniqueConstraint(
                        name = "uk_building_code_per_apartment",
                        columnNames = {"apartment_id", "building_code"}
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
        "managerAssignments",
        "floors",
        "billingCycles"
})
@EqualsAndHashCode(exclude = {
        "apartment",
        "managerAssignments",
        "floors",
        "billingCycles"
})
public class Building {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Building Information
    // ==========================================

    @Column(name = "building_name", nullable = false, length = 100)
    private String buildingName;

    @Column(name = "building_code", nullable = false, length = 20)
    private String buildingCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "building_type", nullable = false, length = 30)
    private BuildingType buildingType;

    @Column(name = "number_of_floors", nullable = false)
    private Integer numberOfFloors;

    @Builder.Default
    @Column(name = "number_of_units", nullable = false)
    private Integer numberOfUnits = 0;

    @Column(name = "description", length = 500)
    private String description;

    // ==========================================
    // Relationships
    // ==========================================

    /**
     * Apartment to which this building belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id", nullable = false)
    private Apartment apartment;

    /**
     * Managers assigned to this building.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "building",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ManagerBuilding> managerAssignments = new ArrayList<>();

    /**
     * Floors belonging to this building.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "building",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Floor> floors = new ArrayList<>();

    /**
     * Billing cycles of this building.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "building",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<BillingCycle> billingCycles = new ArrayList<>();

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

        if (numberOfUnits == null) {
            numberOfUnits = 0;
        }

    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

}