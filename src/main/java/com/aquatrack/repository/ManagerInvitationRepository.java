package com.aquatrack.repository;

import com.aquatrack.entity.User;
import com.aquatrack.entity.ManagerInvitation;
import com.aquatrack.enums.ManagerInvitationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ManagerInvitationRepository
        extends JpaRepository<ManagerInvitation, Long> {

    // ==========================================
    // Find By Token
    // ==========================================

    Optional<ManagerInvitation> findByInvitationToken(
            String invitationToken
    );

    // ==========================================
    // Find By Email
    // ==========================================

    Optional<ManagerInvitation> findTopByEmailOrderByCreatedAtDesc(
            String email
    );

    // ==========================================
    // Find By Status
    // ==========================================

    List<ManagerInvitation> findAllByStatusOrderByCreatedAtDesc(
            ManagerInvitationStatus status
    );

    // ==========================================
    // Find By Apartment
    // ==========================================

    List<ManagerInvitation> findAllByApartmentIdOrderByCreatedAtDesc(
            Long apartmentId
    );

    // ==========================================
    // Find By Building
    // ==========================================

    List<ManagerInvitation> findAllByBuildingIdOrderByCreatedAtDesc(
            Long buildingId
    );

    // ==========================================
    // Pending Invitation
    // ==========================================

    boolean existsByEmailIgnoreCaseAndStatus(
            String email,
            ManagerInvitationStatus status
    );

    // ==========================================
    // Find By Property Admin
    // ==========================================

    List<ManagerInvitation> findAllByInvitedByOrderByCreatedAtDesc(
            User invitedBy
    );

}