package com.aquatrack.repository;

import com.aquatrack.entity.Building;
import com.aquatrack.entity.ManagerInvitation;
import com.aquatrack.entity.ManagerInvitationBuilding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerInvitationBuildingRepository
        extends JpaRepository<ManagerInvitationBuilding, Long> {

    // ==========================================
    // Find Assignments
    // ==========================================

    /**
     * Returns all buildings selected
     * for a manager invitation.
     */
    List<ManagerInvitationBuilding> findByManagerInvitation(
            ManagerInvitation managerInvitation
    );

    /**
     * Returns all building assignments
     * using invitation id.
     */
    List<ManagerInvitationBuilding> findByManagerInvitationId(
            Long invitationId
    );

    /**
     * Returns all invitations
     * containing the given building.
     */
    List<ManagerInvitationBuilding> findByBuilding(
            Building building
    );

    // ==========================================
    // Validation
    // ==========================================

    /**
     * Checks whether a building
     * is already assigned
     * to the invitation.
     */
    boolean existsByManagerInvitationAndBuilding(
            ManagerInvitation managerInvitation,
            Building building
    );

    // ==========================================
    // Delete
    // ==========================================

    /**
     * Deletes all building assignments
     * of an invitation.
     */
    void deleteByManagerInvitation(
            ManagerInvitation managerInvitation
    );

}