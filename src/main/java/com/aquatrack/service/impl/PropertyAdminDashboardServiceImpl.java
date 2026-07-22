package com.aquatrack.service.impl;

import com.aquatrack.dto.dashboard.PropertyAdminDashboardSummaryResponse;
import com.aquatrack.repository.ApartmentRepository;
import com.aquatrack.repository.BuildingRepository;
import com.aquatrack.repository.HouseholdRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.PropertyAdminDashboardService;
import com.aquatrack.entity.User;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.util.SecurityUtil;
import com.aquatrack.entity.Apartment;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertyAdminDashboardServiceImpl
        implements PropertyAdminDashboardService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final UserRepository userRepository;

    private final ApartmentRepository apartmentRepository;

    private final BuildingRepository buildingRepository;

    private final HouseholdRepository householdRepository;

    // ==========================================
    // Dashboard Summary
    // ==========================================

    @Override
    public PropertyAdminDashboardSummaryResponse getDashboardSummary() {

        // ==========================================
        // Get Logged-in Property Admin
        // ==========================================

        String email = SecurityUtil.getCurrentUserEmail();

        User propertyAdmin = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Property Admin not found"));


        // ==========================================
        // Fetch Property Admin Apartments
        // ==========================================

        List<Apartment> apartments =
                apartmentRepository.findAllByPropertyAdmin(propertyAdmin);

        // ==========================================
        // Dashboard Counts
        // ==========================================

        long totalApartments =
                apartmentRepository.countByPropertyAdmin(propertyAdmin);

        long totalBuildings =
                buildingRepository.countByApartmentIn(apartments);

        long totalHouseholds =
                householdRepository.countByApartmentIn(apartments);

        long totalManagers =
                userRepository.countByApartmentInAndRole(
                        apartments,
                        com.aquatrack.enums.UserRole.MANAGER
                );

        long totalResidents =
                userRepository.countByApartmentInAndRole(
                        apartments,
                        com.aquatrack.enums.UserRole.RESIDENT
                );

        return PropertyAdminDashboardSummaryResponse.builder()
                .totalApartments(totalApartments)
                .totalBuildings(totalBuildings)
                .totalHouseholds(totalHouseholds)
                .totalManagers(totalManagers)
                .totalResidents(totalResidents)
                .build();
    }

}
