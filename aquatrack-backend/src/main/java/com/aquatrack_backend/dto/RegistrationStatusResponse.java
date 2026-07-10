package com.aquatrack_backend.dto;

import com.aquatrack_backend.entity.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationStatusResponse {

    private RequestStatus status;
}