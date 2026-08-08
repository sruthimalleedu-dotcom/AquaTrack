package com.aquatrack.dto.bills;

import com.aquatrack.enums.BillStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBillStatusRequestDto {

    // ==========================================
    // Bill Status
    // ==========================================

    @NotNull(message = "Bill status is required.")
    private BillStatus billStatus;

}