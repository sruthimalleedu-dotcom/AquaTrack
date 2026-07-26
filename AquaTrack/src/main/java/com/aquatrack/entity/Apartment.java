package com.aquatrack.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "apartments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"propertyAdmin", "users", "buildings", "households"})
@EqualsAndHashCode(exclude = {"propertyAdmin", "users", "buildings", "households"})
public class Apartment {

    // ==========================================
    // Primary Key
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Apartment Information
    // ==========================================

    @Column(name = "apartment_name", nullable = false, length = 150)
    private String apartmentName;

    @Column(name = "address_line1", nullable = false, length = 255)
    private String addressLine1;

    @Column(name = "address_line2", length = 255)
    private String addressLine2;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Column(name = "state", nullable = false, length = 100)
    private String state;

    @Column(name = "pincode", nullable = false, length = 10)
    private String pincode;

    // ==========================================
    // Relationships
    // ==========================================

    /**
     * One Property Admin can manage multiple Apartment Communities.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_admin_id", nullable = false)
    private User propertyAdmin;

    /**
     * Managers and Residents of this Apartment Community.
     */
    @OneToMany(mappedBy = "apartment", fetch = FetchType.LAZY)
    @Builder.Default
    private List<User> users = new ArrayList<>();

    /**
     * Buildings inside this Apartment Community.
     */
    @OneToMany(
            mappedBy = "apartment",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @Builder.Default
    private List<Building> buildings = new ArrayList<>();

    /**
     * Households belonging to this Apartment.
     *
     * This relationship may be removed later if Household
     * belongs only to Building.
     */
    @OneToMany(mappedBy = "apartment", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Household> households = new ArrayList<>();

    // ==========================================
    // Audit Fields
    // ==========================================

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // ==========================================
    // Lifecycle
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