package com.aquatrack.repository;

import com.aquatrack.entity.PropertyAdminInvitation;
import com.aquatrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PropertyAdminInvitationRepository
        extends JpaRepository<PropertyAdminInvitation, Long> {

    // ==========================================
    // Find By Token
    // ==========================================

    Optional<PropertyAdminInvitation> findByToken(String token);

    boolean existsByToken(String token);

    // ==========================================
    // Check Existing Active Invitation
    // ==========================================

    Optional<PropertyAdminInvitation> findFirstByUserAndIsUsedFalseOrderByCreatedAtDesc(
            User user
    );

}