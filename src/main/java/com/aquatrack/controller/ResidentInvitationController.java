package com.aquatrack.controller;

import com.aquatrack.dto.resident.CreateResidentInvitationRequestDto;
import com.aquatrack.dto.resident.ResidentActivationDetailsResponseDto;
import com.aquatrack.dto.resident.ResidentActivationRequestDto;
import com.aquatrack.dto.resident.ResidentInvitationResponseDto;
import com.aquatrack.service.ResidentInvitationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resident-invitations")
public class ResidentInvitationController {

    // ==========================================
    // Dependencies
    // ==========================================

    private final ResidentInvitationService residentInvitationService;

    // ==========================================
    // Create Resident Invitation
    // ==========================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResidentInvitationResponseDto createResidentInvitation(
            @Valid @RequestBody
            CreateResidentInvitationRequestDto requestDto
    ) {

        return residentInvitationService
                .createResidentInvitation(requestDto);

    }

    // ==========================================
    // Get All Resident Invitations
    // ==========================================

    @GetMapping
    public List<ResidentInvitationResponseDto>
    getAllResidentInvitations() {

        return residentInvitationService
                .getAllResidentInvitations();

    }

    // ==========================================
    // Get Resident Invitation By ID
    // ==========================================

    @GetMapping("/{invitationId}")
    public ResidentInvitationResponseDto
    getResidentInvitationById(
            @PathVariable Long invitationId
    ) {

        return residentInvitationService
                .getResidentInvitationById(invitationId);

    }

    // ==========================================
    // Get Activation Details
    // ==========================================

    @GetMapping("/activate")
    public ResidentActivationDetailsResponseDto
    getActivationDetails(
            @RequestParam String token
    ) {

        return residentInvitationService
                .getActivationDetails(token);

    }

    // ==========================================
    // Activate Resident Account
    // ==========================================

    @PostMapping("/activate")
    @ResponseStatus(HttpStatus.OK)
    public void activateResident(
            @Valid @RequestBody
            ResidentActivationRequestDto requestDto
    ) {

        residentInvitationService
                .activateResident(requestDto);

    }

}