package com.aquatrack.config;

import com.aquatrack.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    // ==========================================
    // Dependencies
    // ==========================================

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // ==========================================
    // Password Encoder
    // ==========================================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ==========================================
    // Authentication Manager
    // ==========================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();

    }

    // ==========================================
    // Security Filter Chain
    // ==========================================

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                // Disable default security features
                .csrf(csrf -> csrf.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .formLogin(form -> form.disable())

                // Stateless JWT Authentication
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // ==========================================
                // Authorization Rules
                // ==========================================

                .authorizeHttpRequests(auth -> auth

                        // ==========================================
                        // Public APIs
                        // ==========================================

                        .requestMatchers("/api/auth/**")
                        .permitAll()

                        .requestMatchers("/api/property-registration/**")
                        .permitAll()

                        .requestMatchers("/api/property-admin/**")
                        .permitAll()

                        // ==========================================
                        // SUPER_ADMIN APIs
                        // ==========================================

                        .requestMatchers("/api/admin/**")
                        .hasAuthority("SUPER_ADMIN")

                        // ==========================================
                        // PROPERTY_ADMIN APIs
                        // ==========================================

                        .requestMatchers("/api/apartments/**")
                        .hasAuthority("PROPERTY_ADMIN")

                        // ==========================================
                        // All Other APIs
                        // ==========================================

                        .anyRequest()
                        .authenticated()

                )

                // ==========================================
                // JWT Filter
                // ==========================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();

    }

}