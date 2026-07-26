package com.aquatrack.mapper;

import com.aquatrack.dto.bulkWaterPurchase.BulkWaterPurchaseResponseDto;
import com.aquatrack.dto.bulkWaterPurchase.CreateBulkWaterPurchaseRequestDto;
import com.aquatrack.dto.bulkWaterPurchase.UpdateBulkWaterPurchaseRequestDto;
import com.aquatrack.entity.BillingCycle;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.BulkWaterPurchase;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class BulkWaterPurchaseMapper {

    public BulkWaterPurchase toEntity(CreateBulkWaterPurchaseRequestDto dto,
                                      Building building,
                                      BillingCycle billingCycle) {

        BigDecimal totalCost = dto.getVolumeKL().multiply(dto.getUnitCost());

        return BulkWaterPurchase.builder()
                .building(building)
                .billingCycle(billingCycle)
                .purchaseDate(dto.getPurchaseDate())
                .source(dto.getSource())
                .volumeKL(dto.getVolumeKL())
                .unitCost(dto.getUnitCost())
                .totalCost(totalCost)
                .supplierName(dto.getSupplierName())
                .invoiceNumber(dto.getInvoiceNumber())
                .remarks(dto.getRemarks())
                .build();
    }

    public void updateEntity(BulkWaterPurchase entity,
                             UpdateBulkWaterPurchaseRequestDto dto) {

        entity.setPurchaseDate(dto.getPurchaseDate());
        entity.setSource(dto.getSource());
        entity.setVolumeKL(dto.getVolumeKL());
        entity.setUnitCost(dto.getUnitCost());

        entity.setTotalCost(
                dto.getVolumeKL().multiply(dto.getUnitCost())
        );

        entity.setSupplierName(dto.getSupplierName());
        entity.setInvoiceNumber(dto.getInvoiceNumber());
        entity.setRemarks(dto.getRemarks());
    }

    public BulkWaterPurchaseResponseDto toResponseDto(BulkWaterPurchase entity) {

        return BulkWaterPurchaseResponseDto.builder()
                .id(entity.getId())
                .buildingId(entity.getBuilding().getId())
                .buildingName(entity.getBuilding().getBuildingName())
                .billingCycleId(entity.getBillingCycle().getId())
                .purchaseDate(entity.getPurchaseDate())
                .source(entity.getSource())
                .volumeKL(entity.getVolumeKL())
                .unitCost(entity.getUnitCost())
                .totalCost(entity.getTotalCost())
                .supplierName(entity.getSupplierName())
                .invoiceNumber(entity.getInvoiceNumber())
                .remarks(entity.getRemarks())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}