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
@ToString(exclude = {"propertyAdmin", "users", "households"})
@EqualsAndHashCode(exclude = {"propertyAdmin", "users", "households"})
public class Apartment {

    // ==========================
    // Primary Key
    // ==========================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================
    // Apartment Information
    // ==========================

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

    @Column(name = "total_households", nullable = false)
    @Builder.Default
    private Integer totalHouseholds = 0;

    // ==========================
    // Relationships
    // ==========================

    /**
     * Property Admin who owns/manages this apartment.
     * One Property Admin can manage multiple apartments.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_admin_id")
    private User propertyAdmin;

    /**
     * Users (Managers / Residents) belonging to this apartment.
     */
    @OneToMany(mappedBy = "apartment", fetch = FetchType.LAZY)
    @Builder.Default
    private List<User> users = new ArrayList<>();

    /**
     * Households belonging to this apartment.
     */
    @OneToMany(mappedBy = "apartment", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Household> households = new ArrayList<>();

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

        if (totalHouseholds == null) {
            totalHouseholds = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}