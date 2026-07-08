package com.aquatrack.mapper;

import com.aquatrack.dto.manager.CreateManagerInvitationRequestDto;
import com.aquatrack.dto.manager.ManagerInvitationResponseDto;
import com.aquatrack.entity.Apartment;
import com.aquatrack.entity.Building;
import com.aquatrack.entity.ManagerInvitation;
import com.aquatrack.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ManagerInvitationMapper {

    // ==========================
    // Entity Mapping
    // ==========================

    /**
     * Converts CreateManagerInvitationRequestDto
     * to ManagerInvitation entity.
     *
     * @param requestDto Create Manager Request
     * @param apartment Apartment
     * @param building Building
     * @param invitedBy Property Admin
     * @return ManagerInvitation entity
     */
    public ManagerInvitation toEntity(
            CreateManagerInvitationRequestDto requestDto,
            Apartment apartment,
            Building building,
            User invitedBy) {

        return ManagerInvitation.builder()
                .firstName(requestDto.getFirstName())
                .lastName(requestDto.getLastName())
                .email(requestDto.getEmail())
                .phone(requestDto.getPhone())
                .apartment(apartment)
                .building(building)
                .invitedBy(invitedBy)
                .build();
    }

    // ==========================
    // Response DTO Mapping
    // ==========================

    /**
     * Converts ManagerInvitation entity
     * to Response DTO.
     *
     * @param invitation Manager Invitation
     * @return Response DTO
     */
    public ManagerInvitationResponseDto toResponseDto(
            ManagerInvitation invitation) {

        return ManagerInvitationResponseDto.builder()
                .id(invitation.getId())
                .firstName(invitation.getFirstName())
                .lastName(invitation.getLastName())
                .email(invitation.getEmail())
                .phone(invitation.getPhone())

                .apartmentId(invitation.getApartment().getId())
                .apartmentName(invitation.getApartment().getApartmentName())

                .buildingId(invitation.getBuilding().getId())
                .buildingName(invitation.getBuilding().getBuildingName())

                .status(invitation.getStatus())
                .expiresAt(invitation.getExpiresAt())
                .activatedAt(invitation.getActivatedAt())

                .createdAt(invitation.getCreatedAt())
                .updatedAt(invitation.getUpdatedAt())
                .build();
    }

}