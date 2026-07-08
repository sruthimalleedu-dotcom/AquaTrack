package com.aquatrack.dto.manager;

import com.aquatrack.enums.ManagerInvitationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerInvitationResponseDto {

    // ==========================
    // Invitation Information
    // ==========================

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    // ==========================
    // Assignment Information
    // ==========================

    private Long apartmentId;

    private String apartmentName;

    private Long buildingId;

    private String buildingName;

    // ==========================
    // Invitation Status
    // ==========================

    private ManagerInvitationStatus status;

    private LocalDateTime expiresAt;

    private LocalDateTime activatedAt;

    private String invitedByName;

    // ==========================
    // Audit Fields
    // ==========================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}