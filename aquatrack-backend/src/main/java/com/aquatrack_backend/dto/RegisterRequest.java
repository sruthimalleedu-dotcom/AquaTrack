package com.aquatrack_backend.dto;

import com.aquatrack_backend.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String username;
    private String password;
    private Role role;
}