package com.aquatrack.entity;

import com.aquatrack.enums.ManagerInvitationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "manager_invitations")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"apartment", "building", "invitedBy"})
@EqualsAndHashCode(exclude = {"apartment", "building", "invitedBy"})
public class ManagerInvitation {

    // ==========================
    // Primary Key
    // ==========================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================
    // Manager Information
    // ==========================

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "phone", length = 15)
    private String phone;

    // ==========================
    // Invitation Information
    // ==========================

    @Column(name = "invitation_token", nullable = false, unique = true)
    private String invitationToken;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private ManagerInvitationStatus status;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "activated_at")
    private LocalDateTime activatedAt;

    // ==========================
    // Relationships
    // ==========================

    /**
     * Apartment assigned to the manager.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id", nullable = false)
    private Apartment apartment;

    /**
     * Building assigned to the manager.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    /**
     * Property Admin who created the invitation.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invited_by", nullable = false)
    private User invitedBy;

    // ==========================
    // Audit Fields
    // ==========================

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // ==========================
    // Lifecycle Methods
    // ==========================

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (status == null) {
            status = ManagerInvitationStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
