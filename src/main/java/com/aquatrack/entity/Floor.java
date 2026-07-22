package com.aquatrack.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "floors",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_floor_name_per_building",
                        columnNames = {"building_id", "floor_name"}
                ),
                @UniqueConstraint(
                        name = "uk_floor_number_per_building",
                        columnNames = {"building_id", "floor_number"}
                )
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {
        "building",
        "households"
})
@EqualsAndHashCode(exclude = {
        "building",
        "households"
})
public class Floor {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Floor Information
    // ==========================================

    @Column(name = "floor_name", nullable = false, length = 50)
    private String floorName;

    @Column(name = "floor_number", nullable = false)
    private Integer floorNumber;

    // ==========================================
    // Relationships
    // ==========================================

    /**
     * Building to which this floor belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    /**
     * Households available on this floor.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "floor",
            fetch = FetchType.LAZY
    )
    private List<Household> households = new ArrayList<>();

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

    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

}