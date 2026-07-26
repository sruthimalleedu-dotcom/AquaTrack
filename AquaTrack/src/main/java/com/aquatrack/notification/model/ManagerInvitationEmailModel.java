package com.aquatrack.notification.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ManagerInvitationEmailModel {

    // ==========================================
    // Manager Information
    // ==========================================

    private String managerName;

    private String email;

    // ==========================================
    // Property Information
    // ==========================================

    private String apartmentName;

    private List<String> buildingNames;

    // ==========================================
    // Invitation Information
    // ==========================================

    private String invitedBy;

    private String activationUrl;

}