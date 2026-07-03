package com.aquatrack.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

    // ==========================================
    // Response Status
    // ==========================================

    private boolean success;

    // ==========================================
    // Response Message
    // ==========================================

    private String message;

    // ==========================================
    // Response Data
    // ==========================================

    private T data;

    // ==========================================
    // Timestamp
    // ==========================================

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    // ==========================================
    // Static Factory Methods
    // ==========================================

    public static <T> ApiResponse<T> success(
            String message,
            T data
    ) {

        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .build();

    }

    public static <T> ApiResponse<T> success(
            String message
    ) {

        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .build();

    }

}