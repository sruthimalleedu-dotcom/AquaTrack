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
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();

    }

    // ==========================================
    // Security Filter Chain
    // ==========================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // ==========================================
                // Disable Default Security
                // ==========================================

                .csrf(csrf -> csrf.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .formLogin(form -> form.disable())

                // ==========================================
                // Stateless Session
                // ==========================================

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

                        // Property Admin Activation / Registration
                        .requestMatchers(
                                "/api/property-admin/register",
                                "/api/property-admin/activate",
                                "/api/property-admin/set-password"
                        )
                        .permitAll()

                        .requestMatchers("/api/test/**")
                        .permitAll()

                        // Manager Invitation Activation
                        .requestMatchers("/api/manager-invitations/activate")
                        .permitAll()

                        // Resident Invitation Activation
                        .requestMatchers("/api/resident-invitations/activate")
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

                        .requestMatchers("/api/manager-invitations/**")
                        .hasAuthority("PROPERTY_ADMIN")

                        .requestMatchers("/api/property-admin/**")
                        .hasAuthority("PROPERTY_ADMIN")

                        // ==========================================
                        // MANAGER APIs
                        // ==========================================

                        .requestMatchers("/api/manager/**")
                        .hasAuthority("MANAGER")

                        .requestMatchers("/api/resident-invitations/**")
                        .hasAuthority("MANAGER")

                        // ==========================================
                        // RESIDENT APIs (Future)
                        // ==========================================

                        .requestMatchers("/api/resident/**")
                        .hasAuthority("RESIDENT")

                        // ==========================================
                        // All Other APIs
                        // ==========================================

                        .requestMatchers("/api/email/**").permitAll()
                        .requestMatchers("/api/invoices/**").permitAll()

                        .requestMatchers(
                                "/api/auth/**",
                                "/api/invoices/**",
                                "/api/dashboard/**"
                        ).permitAll()

                        .anyRequest()
                        .authenticated()

                )

                // ==========================================
                // JWT Authentication Filter
                // ==========================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();

    }

}