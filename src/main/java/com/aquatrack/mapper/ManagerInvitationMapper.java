package com.aquatrack.mapper;

import com.aquatrack.dto.manager.BuildingAssignmentDto;
import com.aquatrack.dto.manager.CreateManagerInvitationRequestDto;
import com.aquatrack.dto.manager.ManagerInvitationResponseDto;
import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.ManagerInvitation;
import com.aquatrack.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ManagerInvitationMapper {

    // ==========================================
    // Entity Mapping
    // ==========================================

    /**
     * Converts CreateManagerInvitationRequestDto
     * to ManagerInvitation entity.
     */
    public ManagerInvitation toEntity(
            CreateManagerInvitationRequestDto requestDto,
            Apartment apartment,
            User invitedBy
    ) {

        return ManagerInvitation.builder()
                .firstName(requestDto.getFirstName())
                .lastName(requestDto.getLastName())
                .email(requestDto.getEmail())
                .phone(requestDto.getPhone())
                .apartment(apartment)
                .invitedBy(invitedBy)
                .build();

    }

    // ==========================================
    // Response DTO Mapping
    // ==========================================

    /**
     * Converts ManagerInvitation entity
     * to Response DTO.
     */
    public ManagerInvitationResponseDto toResponseDto(
            ManagerInvitation invitation
    ) {

        return ManagerInvitationResponseDto.builder()

                // ==========================================
                // Invitation Information
                // ==========================================

                .id(invitation.getId())
                .firstName(invitation.getFirstName())
                .lastName(invitation.getLastName())
                .email(invitation.getEmail())
                .phone(invitation.getPhone())

                // ==========================================
                // Apartment
                // ==========================================

                .apartmentId(
                        invitation.getApartment().getId()
                )
                .apartmentName(
                        invitation.getApartment().getApartmentName()
                )

                // ==========================================
                // Buildings
                // ==========================================

                .buildings(

                        invitation.getAssignedBuildings()
                                .stream()
                                .map(assignment ->

                                        BuildingAssignmentDto.builder()

                                                .id(
                                                        assignment.getBuilding().getId()
                                                )

                                                .buildingName(
                                                        assignment.getBuilding().getBuildingName()
                                                )

                                                .buildingCode(
                                                        assignment.getBuilding().getBuildingCode()
                                                )

                                                .build()

                                )
                                .toList()

                )

                // ==========================================
                // Invitation Status
                // ==========================================

                .status(invitation.getStatus())
                .expiresAt(invitation.getExpiresAt())
                .activatedAt(invitation.getActivatedAt())

                // ==========================================
                // Property Admin
                // ==========================================

                .invitedByName(

                        invitation.getInvitedBy().getFirstName()

                                + " "

                                + (invitation.getInvitedBy().getLastName() == null
                                ? ""
                                : invitation.getInvitedBy().getLastName())

                )

                // ==========================================
                // Audit
                // ==========================================

                .createdAt(invitation.getCreatedAt())
                .updatedAt(invitation.getUpdatedAt())

                .build();

    }

}