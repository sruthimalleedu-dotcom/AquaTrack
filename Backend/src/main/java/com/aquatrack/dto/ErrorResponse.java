package com.aquatrack.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ErrorResponse {

    // ==========================================
    // Response Status
    // ==========================================

    private boolean success;

    // ==========================================
    // HTTP Status Code
    // ==========================================

    private int status;

    // ==========================================
    // Error Message
    // ==========================================

    private String message;

    // ==========================================
    // Validation Errors
    // ==========================================

    @Builder.Default
    private Map<String, String> errors = null;

    // ==========================================
    // Response Timestamp
    // ==========================================

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    // ==========================================
    // Static Factory Methods
    // ==========================================

    public static ErrorResponse error(
            int status,
            String message
    ) {

        return ErrorResponse.builder()
                .success(false)
                .status(status)
                .message(message)
                .build();

    }

    public static ErrorResponse validationError(
            int status,
            String message,
            Map<String, String> errors
    ) {

        return ErrorResponse.builder()
                .success(false)
                .status(status)
                .message(message)
                .errors(errors)
                .build();

    }

}