package com.aquatrack.service;

import com.aquatrack.dto.household.HouseholdRequest;
import com.aquatrack.dto.household.HouseholdResponse;

import java.util.List;

/**
 * Service interface for Household Management.
 */
public interface HouseholdService {

    // ==========================================
    // Create Household
    // ==========================================

    /**
     * Creates a new household under the specified floor.
     *
     * @param floorId Floor ID
     * @param request Household request
     * @return Created household
     */
    HouseholdResponse createHousehold(
            Long floorId,
            HouseholdRequest request
    );

    // ==========================================
    // Get Households
    // ==========================================

    /**
     * Returns all households for a floor.
     *
     * @param floorId Floor ID
     * @return List of households
     */
    List<HouseholdResponse> getHouseholdsByFloor(
            Long floorId
    );

    /**
     * Returns a household by ID.
     *
     * @param floorId Floor ID
     * @param householdId Household ID
     * @return Household details
     */
    HouseholdResponse getHouseholdById(
            Long floorId,
            Long householdId
    );

    /**
     * Returns all households belonging to the buildings
     * assigned to the currently logged-in manager.
     *
     * @return List of households
     */
    List<HouseholdResponse> getManagerHouseholds();

    // ==========================================
    // Update Household
    // ==========================================

    /**
     * Updates an existing household.
     *
     * @param floorId Floor ID
     * @param householdId Household ID
     * @param request Updated household request
     * @return Updated household
     */
    HouseholdResponse updateHousehold(
            Long floorId,
            Long householdId,
            HouseholdRequest request
    );

    // ==========================================
    // Delete Household
    // ==========================================

    /**
     * Deletes a household.
     *
     * @param floorId Floor ID
     * @param householdId Household ID
     */
    void deleteHousehold(
            Long floorId,
            Long householdId
    );

}