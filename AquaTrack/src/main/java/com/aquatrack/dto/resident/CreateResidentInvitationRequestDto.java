package com.aquatrack.dto.resident;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateResidentInvitationRequestDto {

    @NotNull(message = "Resident ID is required.")
    private Long residentId;

}