package com.aquatrack_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Marks this class as a Spring configuration class
public class SecurityConfig {

    @Bean // Creates a PasswordEncoder bean that can be injected anywhere
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Encrypts passwords using BCrypt
    }

    @Bean // Configures Spring Security
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        System.out.println("========== MY SECURITY CONFIG LOADED =========");
        http
                // Disable CSRF since we're testing REST APIs using Postman
                .csrf(csrf -> csrf.disable())

                // Configure which endpoints require authentication
                .authorizeHttpRequests(auth -> auth
                // Public APIs
                .requestMatchers(
                        "/api/auth/**",
                        "/api/registration/**"
                ).permitAll()

                // All other APIs require login
                .anyRequest().authenticated()
            );

        return http.build();
    }
}