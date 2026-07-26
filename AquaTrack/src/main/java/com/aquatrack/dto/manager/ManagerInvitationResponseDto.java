package com.aquatrack.dto.manager;

import com.aquatrack.enums.ManagerInvitationStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ManagerInvitationResponseDto {

    // ==========================================
    // Invitation Information
    // ==========================================

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    // ==========================================
    // Apartment Information
    // ==========================================

    private Long apartmentId;

    private String apartmentName;

    // ==========================================
    // Assigned Buildings
    // ==========================================

    private List<BuildingAssignmentDto> buildings;

    // ==========================================
    // Invitation Status
    // ==========================================

    private ManagerInvitationStatus status;

    private LocalDateTime expiresAt;

    private LocalDateTime activatedAt;

    private String invitedByName;

    // ==========================================
    // Audit
    // ==========================================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}