package com.aquatrack.service;

import com.aquatrack.dto.resident.ResidentWaterBillResponseDto;

import java.util.List;

public interface ResidentWaterBillService {

    // ==========================================
    // Get My Water Bills
    // ==========================================

    List<ResidentWaterBillResponseDto> getMyWaterBills();

}
