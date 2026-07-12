package com.aquatrack.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String rawPassword = "Admin@123";

        String encodedPassword = encoder.encode(rawPassword);

        System.out.println("Raw Password    : " + rawPassword);
        System.out.println("BCrypt Password : " + encodedPassword);

    }

}