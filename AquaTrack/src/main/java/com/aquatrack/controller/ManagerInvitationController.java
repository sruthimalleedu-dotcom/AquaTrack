package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.manager.CreateManagerInvitationRequestDto;
import com.aquatrack.dto.manager.ManagerActivationRequestDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.aquatrack.service.ManagerInvitationService;
import com.aquatrack.dto.manager.ManagerInvitationResponseDto;
import com.aquatrack.dto.manager.ManagerActivationDetailsResponseDto;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/api/manager-invitations")
@RequiredArgsConstructor
public class ManagerInvitationController {

    // ==========================
    // Dependencies
    // ==========================

    private final ManagerInvitationService managerInvitationService;

    // ==========================
    // Create Manager Invitation
    // ==========================

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createManagerInvitation(
            @Valid @RequestBody
            CreateManagerInvitationRequestDto requestDto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Manager invitation created successfully.",
                                managerInvitationService.createManagerInvitation(
                                        requestDto
                                )
                        )
                );
    }

    // ==========================
    // Get All Manager Invitations
    // ==========================

    @GetMapping
    public ResponseEntity<ApiResponse<List<ManagerInvitationResponseDto>>>
    getAllManagerInvitations() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Manager invitations fetched successfully.",
                        managerInvitationService.getAllManagerInvitations()
                )
        );
    }

    // ==========================
    // Get Manager Invitation By ID
    // ==========================

    @GetMapping("/{invitationId}")
    public ResponseEntity<ApiResponse<ManagerInvitationResponseDto>>
    getManagerInvitationById(
            @PathVariable Long invitationId) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Manager invitation fetched successfully.",
                        managerInvitationService.getManagerInvitationById(
                                invitationId
                        )
                )
        );
    }

    // ==========================================
    // Get Activation Details
    // ==========================================

    @GetMapping("/activate")
    public ResponseEntity<ApiResponse<ManagerActivationDetailsResponseDto>>
    getActivationDetails(
            @RequestParam String token
    ) {

        return ResponseEntity.ok(

                ApiResponse.success(

                        "Invitation validated successfully.",

                        managerInvitationService.getActivationDetails(
                                token
                        )

                )

        );

    }

    // ==========================
    // Activate Manager
    // ==========================

    @PostMapping("/activate")
    public ResponseEntity<ApiResponse<?>> activateManager(
            @Valid @RequestBody
            ManagerActivationRequestDto requestDto) {

        managerInvitationService.activateManager(requestDto);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Manager account activated successfully.",
                        null
                )
        );
    }

}