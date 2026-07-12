package com.aquatrack.dto.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String token;

    @Builder.Default
    private String tokenType = "Bearer";

    private String email;

    private String role;

}