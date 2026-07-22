package com.aquatrack.repository;

import com.aquatrack.entity.ResidentInvitation;
import com.aquatrack.entity.User;
import com.aquatrack.enums.ManagerInvitationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResidentInvitationRepository
        extends JpaRepository<ResidentInvitation, Long> {

    // ==========================================
    // Find By Invitation Token
    // ==========================================

    Optional<ResidentInvitation> findByInvitationToken(
            String invitationToken
    );

    // ==========================================
    // Check Pending Invitation
    // ==========================================

    boolean existsByResidentAndStatus(
            User resident,
            ManagerInvitationStatus status
    );

    // ==========================================
    // Find Pending Invitation For Resident
    // ==========================================

    Optional<ResidentInvitation> findByResidentAndStatus(
            User resident,
            ManagerInvitationStatus status
    );

    // ==========================================
    // Get Invitations Created By Manager
    // ==========================================

    List<ResidentInvitation> findAllByInvitedByOrderByCreatedAtDesc(
            User invitedBy
    );

}