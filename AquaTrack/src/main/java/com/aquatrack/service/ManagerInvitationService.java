package com.aquatrack.service;

import com.aquatrack.dto.manager.CreateManagerInvitationRequestDto;
import com.aquatrack.dto.manager.ManagerActivationRequestDto;
import com.aquatrack.dto.manager.ManagerInvitationResponseDto;
import com.aquatrack.dto.manager.ManagerActivationDetailsResponseDto;

import java.util.List;

public interface ManagerInvitationService {

    // ==========================
    // Manager Invitation
    // ==========================

    /**
     * Creates a new manager invitation.
     *
     * @param requestDto Manager invitation request
     * @return Manager invitation response
     */
    ManagerInvitationResponseDto createManagerInvitation(
            CreateManagerInvitationRequestDto requestDto
    );

    // ==========================
    // Get Invitations
    // ==========================

    /**
     * Returns all manager invitations
     * of the logged-in Property Admin.
     *
     * @return List of manager invitations
     */
    List<ManagerInvitationResponseDto> getAllManagerInvitations();

    /**
     * Returns manager invitation by ID.
     *
     * @param invitationId Invitation ID
     * @return Manager invitation response
     */
    ManagerInvitationResponseDto getManagerInvitationById(
            Long invitationId
    );

    // ==========================================
    // Get Activation Details
    // ==========================================

    /**
     * Validates the invitation token
     * and returns manager invitation details.
     *
     * @param token Invitation token
     * @return Manager activation details
     */
    ManagerActivationDetailsResponseDto getActivationDetails(
            String token
    );

    // ==========================
    // Activation
    // ==========================

    /**
     * Activates manager account.
     *
     * @param requestDto Activation request
     */
    void activateManager(
            ManagerActivationRequestDto requestDto
    );



}
