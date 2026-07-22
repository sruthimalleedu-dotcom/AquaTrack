package com.aquatrack.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "manager_invitation_buildings",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_invitation_building",
                        columnNames = {
                                "manager_invitation_id",
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
        "managerInvitation",
        "building"
})
@EqualsAndHashCode(exclude = {
        "managerInvitation",
        "building"
})
public class ManagerInvitationBuilding {

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
     * Manager Invitation
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "manager_invitation_id",
            nullable = false
    )
    private ManagerInvitation managerInvitation;

    /**
     * Building selected in the invitation
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "building_id",
            nullable = false
    )
    private Building building;

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

    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

}
