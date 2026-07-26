package com.aquatrack.service;

import com.aquatrack.dto.resident.CreateResidentInvitationRequestDto;
import com.aquatrack.dto.resident.ResidentActivationDetailsResponseDto;
import com.aquatrack.dto.resident.ResidentActivationRequestDto;
import com.aquatrack.dto.resident.ResidentInvitationResponseDto;

import java.util.List;

public interface ResidentInvitationService {

    // ==========================================
    // Create Resident Invitation
    // ==========================================

    ResidentInvitationResponseDto createResidentInvitation(
            CreateResidentInvitationRequestDto requestDto
    );

    // ==========================================
    // Get All Resident Invitations
    // ==========================================

    List<ResidentInvitationResponseDto>
    getAllResidentInvitations();

    // ==========================================
    // Get Resident Invitation By ID
    // ==========================================

    ResidentInvitationResponseDto
    getResidentInvitationById(
            Long invitationId
    );

    // ==========================================
    // Get Activation Details
    // ==========================================

    ResidentActivationDetailsResponseDto
    getActivationDetails(
            String token
    );

    // ==========================================
    // Activate Resident
    // ==========================================

    void activateResident(
            ResidentActivationRequestDto requestDto
    );

}