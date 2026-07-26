package com.aquatrack.entity;

import com.aquatrack.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {
        "ownedApartments",
        "apartment",
        "household",
        "managerBuildings",
        "uploadedWaterUsageLogs"
})
@EqualsAndHashCode(exclude = {
        "ownedApartments",
        "apartment",
        "household",
        "managerBuildings",
        "uploadedWaterUsageLogs"
})
public class User {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Basic Information
    // ==========================================

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    /**
     * Password will be null until the resident
     * accepts the invitation and creates one.
     */
    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "phone", unique = true, length = 15)
    private String phone;

    // ==========================================
    // User Role
    // ==========================================

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 30)
    private UserRole role;

    // ==========================================
    // Account Status
    // ==========================================

    /**
     * true  -> User can log in.
     * false -> Invitation pending or account disabled.
     */
    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    // ==========================================
    // Relationships
    // ==========================================

    /**
     * Apartments owned by this Property Admin.
     */
    @Builder.Default
    @OneToMany(mappedBy = "propertyAdmin", fetch = FetchType.LAZY)
    private List<Apartment> ownedApartments = new ArrayList<>();

    /**
     * Apartment assigned to this user.
     * Used for Managers and Residents.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id")
    private Apartment apartment;

    /**
     * Buildings assigned to this Manager.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "manager",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ManagerBuilding> managerBuildings = new ArrayList<>();

    /**
     * Household assigned to this Resident.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "household_id")
    private Household household;

    /**
     * Water usage logs uploaded by this user.
     * Typically used for Managers who manually
     * record or upload household meter readings.
     */
    @Builder.Default
    @OneToMany(mappedBy = "uploadedBy", fetch = FetchType.LAZY)
    private List<WaterUsageLog> uploadedWaterUsageLogs = new ArrayList<>();

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

        if (isActive == null) {
            isActive = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}