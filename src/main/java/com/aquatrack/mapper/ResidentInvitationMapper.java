package com.aquatrack.mapper;

import com.aquatrack.dto.resident.ResidentActivationDetailsResponseDto;
import com.aquatrack.dto.resident.ResidentInvitationResponseDto;
import com.aquatrack.entity.Household;
import com.aquatrack.entity.ResidentInvitation;
import com.aquatrack.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ResidentInvitationMapper {

    // ==========================================
    // Entity -> Response DTO
    // ==========================================

    public ResidentInvitationResponseDto toResponseDto(
            ResidentInvitation invitation) {

        Household household = invitation.getHousehold();

        return ResidentInvitationResponseDto.builder()

                .id(invitation.getId())

                .residentId(invitation.getResident().getId())

                .residentName(
                        invitation.getResident().getFirstName()
                                + " "
                                + (invitation.getResident().getLastName() == null
                                ? ""
                                : invitation.getResident().getLastName())
                )

                .email(invitation.getResident().getEmail())

                .householdId(household.getId())

                .householdNumber(
                        household.getHouseNumber()
                )

                .apartmentName(
                        household.getApartment()
                                .getApartmentName()
                )

                .invitedBy(
                        invitation.getInvitedBy().getFirstName()
                                + " "
                                + (invitation.getInvitedBy().getLastName() == null
                                ? ""
                                : invitation.getInvitedBy().getLastName())
                )

                .status(invitation.getStatus())

                .expiresAt(invitation.getExpiresAt())

                .activatedAt(invitation.getActivatedAt())

                .createdAt(invitation.getCreatedAt())

                .build();

    }

    // ==========================================
    // Create Entity
    // ==========================================

    public ResidentInvitation toEntity(
            User resident,
            Household household,
            User invitedBy) {

        return ResidentInvitation.builder()

                .resident(resident)

                .household(household)

                .invitedBy(invitedBy)

                .build();

    }

    // ==========================================
    // Entity -> Activation Details DTO
    // ==========================================

    public ResidentActivationDetailsResponseDto
    toActivationDetailsDto(
            ResidentInvitation invitation) {

        Household household = invitation.getHousehold();

        return ResidentActivationDetailsResponseDto.builder()

                .firstName(
                        invitation.getResident().getFirstName()
                )

                .lastName(
                        invitation.getResident().getLastName()
                )

                .email(
                        invitation.getResident().getEmail()
                )

                .apartmentName(
                        household.getApartment()
                                .getApartmentName()
                )

                .buildingName(
                        household.getFloor()
                                .getBuilding()
                                .getBuildingName()
                )

                .householdNumber(
                        household.getHouseNumber()
                )

                .build();

    }

}