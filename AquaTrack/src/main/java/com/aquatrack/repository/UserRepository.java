package com.aquatrack.repository;

import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.User;
import com.aquatrack.enums.UserRole;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.Household;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // ==========================================
    // Authentication
    // ==========================================

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByPhone(String phone);

    /**
     * Checks if a phone number already exists
     * excluding the given user ID.
     */
    boolean existsByPhoneAndIdNot(
            String phone,
            Long id
    );

    // ==========================================
    // Property Admin Management
    // ==========================================

    List<User> findAllByRoleOrderByIdAsc(
            UserRole role
    );

    Optional<User> findByIdAndRole(
            Long id,
            UserRole role
    );

    Optional<User> findFirstByHouseholdAndRole(
            Household household,
            UserRole role
    );

    // ==========================================
    // Super Admin Dashboard
    // ==========================================

    long countByRole(
            UserRole role
    );

    long countByRoleAndIsActiveTrue(
            UserRole role
    );

    long countByRoleAndIsActiveFalse(
            UserRole role
    );

    // ==========================================
    // Property Admin Dashboard
    // ==========================================

    long countByApartmentInAndRole(
            List<Apartment> apartments,
            UserRole role
    );

    // ==========================================
// Manager Dashboard
// ==========================================

    long countByRoleAndHousehold_Floor_BuildingIn(
            UserRole role,
            List<Building> buildings
    );

    // ==========================================
// Manager Households
// ==========================================

    /**
     * Counts the total users belonging to a household.
     */
    long countByHousehold(
            Household household
    );

    // ==========================================
    // Resident Management
    // ==========================================

    /**
     * Returns all residents of a household.
     */
    List<User> findByHouseholdIdAndRoleOrderByFirstNameAsc(
            Long householdId,
            UserRole role
    );

    /**
     * Returns all active residents of a household.
     */
    List<User> findByHouseholdIdAndRoleAndIsActiveTrueOrderByFirstNameAsc(
            Long householdId,
            UserRole role
    );

    /**
     * Returns a resident by ID within a household.
     */
    Optional<User> findByIdAndRoleAndHouseholdId(
            Long id,
            UserRole role,
            Long householdId
    );

    /**
     * Counts active residents in a household.
     */
    long countByHouseholdIdAndRoleAndIsActiveTrue(
            Long householdId,
            UserRole role
    );

    /**
     * Returns all residents of an apartment.
     */
    List<User> findByApartmentAndRoleOrderByFirstNameAsc(
            Apartment apartment,
            UserRole role
    );

    /**
     * Counts active residents of an apartment.
     */
    long countByApartmentAndRoleAndIsActiveTrue(
            Apartment apartment,
            UserRole role
    );

    /**
     * Counts inactive residents of an apartment.
     */
    long countByApartmentAndRoleAndIsActiveFalse(
            Apartment apartment,
            UserRole role
    );

}