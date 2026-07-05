package com.aquatrack.service;

import com.aquatrack.entity.User;

public interface CurrentUserService {

    // ==========================================
    // Get Currently Logged-in User
    // ==========================================

    User getCurrentUser();

}