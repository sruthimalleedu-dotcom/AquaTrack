package com.aquatrack.service;

import com.aquatrack.dto.propertyadmin.PropertyAdminActivationResponse;
import com.aquatrack.dto.propertyadmin.SetPasswordRequest;

public interface PropertyAdminService {

    // ==========================================
    // Validate Activation Token
    // ==========================================

    PropertyAdminActivationResponse validateActivationToken(
            String token
    );



    // ==========================================
    // Set Password & Activate Account
    // ==========================================

    void setPassword(
            SetPasswordRequest request
    );

}
