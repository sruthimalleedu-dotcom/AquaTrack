package com.aquatrack.service.impl;

import com.aquatrack.dto.bulkWaterPurchase.BulkWaterPurchaseResponseDto;
import com.aquatrack.dto.bulkWaterPurchase.CreateBulkWaterPurchaseRequestDto;
import com.aquatrack.dto.bulkWaterPurchase.UpdateBulkWaterPurchaseRequestDto;
import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.BulkWaterPurchase;
import com.aquatrack.entity.User;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.BulkWaterPurchaseMapper;
import com.aquatrack.repository.BillingCycleRepository;
import com.aquatrack.repository.BuildingRepository;
import com.aquatrack.repository.BulkWaterPurchaseRepository;
import com.aquatrack.repository.ManagerBuildingRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.BulkWaterPurchaseService;
import com.aquatrack.util.SecurityUtil;
import org.springframework.security.access.AccessDeniedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BulkWaterPurchaseServiceImpl implements BulkWaterPurchaseService {

    private final BulkWaterPurchaseRepository bulkWaterPurchaseRepository;
    private final BuildingRepository buildingRepository;
    private final BillingCycleRepository billingCycleRepository;
    private final BulkWaterPurchaseMapper bulkWaterPurchaseMapper;
    private final UserRepository userRepository;
    private final ManagerBuildingRepository managerBuildingRepository;


    @Override
    public BulkWaterPurchaseResponseDto createBulkWaterPurchase(
            CreateBulkWaterPurchaseRequestDto requestDto) {

        // Verify manager has access to the building
        Building building = getManagedBuilding(requestDto.getBuildingId());

        // Fetch Billing Cycle
        BillingCycle billingCycle = billingCycleRepository
                .findById(requestDto.getBillingCycleId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Billing Cycle not found with ID: "
                                + requestDto.getBillingCycleId()));

        // Ensure Billing Cycle belongs to the selected Building
        if (!billingCycle.getBuilding().getId().equals(building.getId())) {
            throw new IllegalArgumentException(
                    "Billing Cycle does not belong to the selected Building.");
        }

        // Convert DTO to Entity
        BulkWaterPurchase purchase = bulkWaterPurchaseMapper.toEntity(
                requestDto,
                building,
                billingCycle
        );

        // Save Purchase
        BulkWaterPurchase savedPurchase =
                bulkWaterPurchaseRepository.save(purchase);

        // Return Response DTO
        return bulkWaterPurchaseMapper.toResponseDto(savedPurchase);
    }

    @Override
    @Transactional(readOnly = true)
    public BulkWaterPurchaseResponseDto getBulkWaterPurchaseById(Long purchaseId) {

        BulkWaterPurchase purchase = bulkWaterPurchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bulk Water Purchase not found with ID: " + purchaseId));

        // Verify manager has access to this building
        getManagedBuilding(purchase.getBuilding().getId());

        return bulkWaterPurchaseMapper.toResponseDto(purchase);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BulkWaterPurchaseResponseDto> getAllBulkWaterPurchases() {

        String email = SecurityUtil.getCurrentUserEmail();

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Authenticated user not found."));

        List<Building> buildings = managerBuildingRepository
                .findByManager(manager)
                .stream()
                .map(managerBuilding -> managerBuilding.getBuilding())
                .toList();

        return bulkWaterPurchaseRepository
                .findByBuildingInOrderByPurchaseDateDesc(buildings)
                .stream()
                .map(bulkWaterPurchaseMapper::toResponseDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<BulkWaterPurchaseResponseDto> getBulkWaterPurchasesByBuilding(Long buildingId) {

        Building building = getManagedBuilding(buildingId);

        return bulkWaterPurchaseRepository
                .findByBuildingOrderByPurchaseDateDesc(building)
                .stream()
                .map(bulkWaterPurchaseMapper::toResponseDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<BulkWaterPurchaseResponseDto> getBulkWaterPurchasesByBillingCycle(
            Long billingCycleId) {

        BillingCycle billingCycle = billingCycleRepository.findById(billingCycleId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Billing Cycle not found with ID: " + billingCycleId));

        // Verify manager has access to the building
        getManagedBuilding(billingCycle.getBuilding().getId());

        return bulkWaterPurchaseRepository
                .findByBillingCycle(billingCycle)
                .stream()
                .map(bulkWaterPurchaseMapper::toResponseDto)
                .toList();
    }

    @Override
    public BulkWaterPurchaseResponseDto updateBulkWaterPurchase(
            Long purchaseId,
            UpdateBulkWaterPurchaseRequestDto requestDto) {

        BulkWaterPurchase purchase = bulkWaterPurchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bulk Water Purchase not found with ID: " + purchaseId));

        getManagedBuilding(purchase.getBuilding().getId());

        // Update Entity
        bulkWaterPurchaseMapper.updateEntity(purchase, requestDto);

        // Save Updated Entity
        BulkWaterPurchase updatedPurchase = bulkWaterPurchaseRepository.save(purchase);

        // Return Response DTO
        return bulkWaterPurchaseMapper.toResponseDto(updatedPurchase);
    }

    @Override
    public void deleteBulkWaterPurchase(Long purchaseId) {

        BulkWaterPurchase purchase = bulkWaterPurchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bulk Water Purchase not found with ID: " + purchaseId));

        getManagedBuilding(purchase.getBuilding().getId());

        bulkWaterPurchaseRepository.delete(purchase);
    }

    private Building getManagedBuilding(Long buildingId) {

        String email = SecurityUtil.getCurrentUserEmail();

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found."));

        boolean assigned = managerBuildingRepository
                .existsByManagerIdAndBuildingId(
                        manager.getId(),
                        buildingId
                );

        if (!assigned) {
            throw new AccessDeniedException(
                    "You are not authorized to access this building.");
        }

        return buildingRepository.findById(buildingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Building not found with ID: " + buildingId));
    }



}
