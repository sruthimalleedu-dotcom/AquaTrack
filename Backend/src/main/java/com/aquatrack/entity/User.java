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
@ToString(exclude = {"ownedApartments", "apartment", "building", "household"})
@EqualsAndHashCode(exclude = {"ownedApartments", "apartment", "building", "household"})
public class User {

    // ==========================
    // Primary Key
    // ==========================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================
    // Basic Information
    // ==========================

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "phone", unique = true, length = 15)
    private String phone;

    // ==========================
    // User Role
    // ==========================

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 30)
    private UserRole role;

    // ==========================
    // User Status
    // ==========================

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    // ==========================
    // Relationships
    // ==========================

    /**
     * Apartments owned by this Property Admin.
     * Applicable only for users having PROPERTY_ADMIN role.
     */
    @OneToMany(mappedBy = "propertyAdmin", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Apartment> ownedApartments = new ArrayList<>();

    /**
     * Apartment assigned to this user.
     * Used for Managers and Residents.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id")
    private Apartment apartment;

    /**
     * Building assigned to this user.
     * Used for Managers.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id")
    private Building building;


    /**
     * Household assigned to this user.
     * Used for Residents.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "household_id")
    private Household household;

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

        if (isActive == null) {
            isActive = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}