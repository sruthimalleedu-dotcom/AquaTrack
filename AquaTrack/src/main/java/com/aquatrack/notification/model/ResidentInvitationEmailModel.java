package com.aquatrack.notification.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResidentInvitationEmailModel {

    // ==========================================
    // Resident Information
    // ==========================================

    private String residentName;

    private String email;

    // ==========================================
    // Property Information
    // ==========================================

    private String apartmentName;

    private String buildingName;

    private String householdNumber;

    // ==========================================
    // Invitation Information
    // ==========================================

    private String activationUrl;

}