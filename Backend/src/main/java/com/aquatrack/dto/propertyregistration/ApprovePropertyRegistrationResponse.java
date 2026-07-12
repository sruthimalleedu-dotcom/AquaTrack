package com.aquatrack.dto.propertyregistration;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ApprovePropertyRegistrationResponse {

    // ==========================
    // Property Admin Information
    // ==========================

    private Long propertyAdminId;

    private String propertyAdminEmail;

    // ==========================
    // Invitation Information
    // ==========================

    private String invitationToken;

    private String activationLink;

}
