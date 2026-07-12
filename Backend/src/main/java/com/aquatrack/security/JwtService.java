package com.aquatrack.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey secretKey;

    @PostConstruct
    public void init() {

        secretKey = Keys.hmacShaKeyFor(
                jwtSecret.getBytes(StandardCharsets.UTF_8)
        );

    }

    // ==========================================
    // Extract Username
    // ==========================================

    public String extractUsername(String token) {

        return extractClaim(token, Claims::getSubject);

    }

    // ==========================================
    // Extract Any Claim
    // ==========================================

    public <T> T extractClaim(String token,
                              Function<Claims, T> claimsResolver) {

        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);

    }

    // ==========================================
    // Generate JWT Token
    // ==========================================

    public String generateToken(UserDetails userDetails) {

        return Jwts.builder()

                .subject(userDetails.getUsername())

                .claim(
                        "role",
                        userDetails.getAuthorities()
                                .stream()
                                .findFirst()
                                .orElseThrow()
                                .getAuthority()
                )

                .issuedAt(new java.util.Date())

                .expiration(
                        new java.util.Date(
                                System.currentTimeMillis() + jwtExpiration
                        )
                )

                .signWith(secretKey)

                .compact();

    }

    // ==========================================
    // Extract User Role
    // ==========================================

    public String extractRole(String token) {

        return extractAllClaims(token)
                .get("role", String.class);

    }

    // ==========================================
    // Extract All Claims
    // ==========================================

    private Claims extractAllClaims(String token) {

        return Jwts.parser()

                .verifyWith(secretKey)

                .build()

                .parseSignedClaims(token)

                .getPayload();

    }

    // ==========================================
    // Extract Expiration Date
    // ==========================================

    private java.util.Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);

    }

    // ==========================================
    // Check Token Expiration
    // ==========================================

    public boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new java.util.Date());

    }

    // ==========================================
    // Validate JWT Token
    // ==========================================

    public boolean isTokenValid(String token, UserDetails userDetails) {

        final String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);

    }

}