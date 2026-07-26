package com.aquatrack.dto.resident;

import com.aquatrack.enums.ManagerInvitationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResidentInvitationResponseDto {

    private Long id;

    private Long residentId;

    private String residentName;

    private String email;

    private Long householdId;

    private String householdNumber;

    private String apartmentName;

    private String invitedBy;

    private ManagerInvitationStatus status;

    private LocalDateTime expiresAt;

    private LocalDateTime activatedAt;

    private LocalDateTime createdAt;

}