package com.aquatrack.dto.propertyregistration;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RejectPropertyRegistrationRequest {

    @NotBlank(message = "Remarks are required.")
    private String remarks;

}