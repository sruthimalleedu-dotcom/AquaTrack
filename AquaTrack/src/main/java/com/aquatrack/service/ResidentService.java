package com.aquatrack.service;

import com.aquatrack.dto.resident.ResidentRequest;
import com.aquatrack.dto.resident.ResidentResponse;

import java.util.List;

public interface ResidentService {

    /**
     * Creates a new resident under a household.
     */
    ResidentResponse createResident(
            Long householdId,
            ResidentRequest request
    );

    /**
     * Returns all residents of a household.
     */
    List<ResidentResponse> getResidentsByHousehold(
            Long householdId
    );

    /**
     * Returns a resident by ID.
     */
    ResidentResponse getResidentById(
            Long householdId,
            Long residentId
    );

    /**
     * Updates resident information.
     */
    ResidentResponse updateResident(
            Long householdId,
            Long residentId,
            ResidentRequest request
    );

    void suspendResident(
            Long householdId,
            Long residentId
    );

    void reactivateResident(
            Long householdId,
            Long residentId
    );



}