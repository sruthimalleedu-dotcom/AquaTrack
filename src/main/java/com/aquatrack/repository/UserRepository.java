package com.aquatrack.repository;

import com.aquatrack.entity.User;
import com.aquatrack.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByPhone(String phone);

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

}