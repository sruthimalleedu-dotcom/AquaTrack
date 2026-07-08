package com.aquatrack.controller;

import com.aquatrack.dto.ApiResponse;
import com.aquatrack.dto.manager.CreateManagerInvitationRequestDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.aquatrack.service.ManagerInvitationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for Manager Invitation Management.
 *
 * Handles Manager Invitation operations.
 */
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

}