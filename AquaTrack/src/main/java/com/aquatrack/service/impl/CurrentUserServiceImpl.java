package com.aquatrack.service.impl;

import com.aquatrack.entity.User;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.security.CustomUserDetails;
import com.aquatrack.service.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrentUserServiceImpl
        implements CurrentUserService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final UserRepository userRepository;

    // ==========================================
    // Get Current User
    // ==========================================

    @Override
    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        return userRepository.findByEmail(
                        userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found."));

    }

}