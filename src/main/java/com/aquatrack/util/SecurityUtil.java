package com.aquatrack.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Utility class for accessing authenticated user information.
 */
public final class SecurityUtil {

    private SecurityUtil() {
    }

    /**
     * Returns the email of the currently authenticated user.
     *
     * @return Logged-in user's email
     */
    public static String getCurrentUserEmail() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName();
    }

}