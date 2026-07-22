package com.aquatrack.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "manager_buildings",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_manager_building",
                        columnNames = {
                                "manager_id",
                                "building_id"
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
        "manager",
        "building",
        "assignedBy"
})
@EqualsAndHashCode(exclude = {
        "manager",
        "building",
        "assignedBy"
})
public class ManagerBuilding {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Relationships
    // ==========================================

    /**
     * Manager who is assigned to the building.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "manager_id",
            nullable = false
    )
    private User manager;

    /**
     * Building assigned to the manager.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "building_id",
            nullable = false
    )
    private Building building;

    /**
     * Property Admin who assigned this building.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "assigned_by",
            nullable = false
    )
    private User assignedBy;

    // ==========================================
    // Assignment Information
    // ==========================================

    @Column(
            name = "assigned_at",
            nullable = false,
            updatable = false
    )
    private LocalDateTime assignedAt;

    // ==========================================
    // Audit
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

        LocalDateTime now = LocalDateTime.now();

        assignedAt = now;
        createdAt = now;
        updatedAt = now;

    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

}
