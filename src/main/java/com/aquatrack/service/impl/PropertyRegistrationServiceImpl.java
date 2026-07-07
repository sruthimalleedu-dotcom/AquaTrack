package com.aquatrack.service.impl;

import com.aquatrack.dto.propertyregistration.ApprovePropertyRegistrationResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationCreateRequest;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationResponse;
import com.aquatrack.dto.propertyregistration.PropertyRegistrationSummaryResponse;
import com.aquatrack.dto.propertyregistration.RejectPropertyRegistrationRequest;
import com.aquatrack.entity.PropertyRegistrationRequest;
import com.aquatrack.entity.User;
import com.aquatrack.enums.UserRole;
import com.aquatrack.enums.RegistrationStatus;
import com.aquatrack.exception.DuplicateResourceException;
import com.aquatrack.exception.ResourceNotFoundException;
import com.aquatrack.mapper.PropertyRegistrationMapper;
import com.aquatrack.repository.PropertyAdminInvitationRepository;
import com.aquatrack.repository.PropertyRegistrationRequestRepository;
import com.aquatrack.repository.UserRepository;
import com.aquatrack.service.PropertyRegistrationService;
import com.aquatrack.service.CurrentUserService;
import com.aquatrack.notification.service.NotificationService;
import com.aquatrack.entity.PropertyAdminInvitation;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyRegistrationServiceImpl
        implements PropertyRegistrationService {

    // ==========================================
    // Dependencies
    // ==========================================

    private final PropertyRegistrationRequestRepository repository;

    private final PropertyRegistrationMapper mapper;

    private final UserRepository userRepository;

    private final PropertyAdminInvitationRepository invitationRepository;

    private final PasswordEncoder passwordEncoder;

    private final CurrentUserService currentUserService;

    private final NotificationService notificationService;

    // ==========================================
    // Submit Registration Request
    // ==========================================

    @Override
    public PropertyRegistrationResponse submitRegistrationRequest(
            PropertyRegistrationCreateRequest request) {

        // ==========================================
        // Duplicate Email Validation
        // ==========================================

        if (repository.existsByEmailIgnoreCase(request.getEmail())) {

            throw new DuplicateResourceException(
                    "A registration request already exists with this email."
            );

        }

        // ==========================================
        // DTO -> Entity
        // ==========================================

        PropertyRegistrationRequest entity =
                mapper.toEntity(request);

        // ==========================================
        // Save Registration Request
        // ==========================================

        PropertyRegistrationRequest savedEntity =
                repository.save(entity);

        // ==========================================
        // Entity -> Response
        // ==========================================

        return mapper.toResponse(savedEntity);

    }

    // ==========================================
    // Get All Registration Requests
    // ==========================================

    @Override
    public List<PropertyRegistrationSummaryResponse> getAllRegistrationRequests() {

        return repository.findAll()
                .stream()
                .map(mapper::toSummaryResponse)
                .toList();

    }

    // ==========================================
    // Get Registration Request By ID
    // ==========================================

    @Override
    public PropertyRegistrationResponse getRegistrationRequestById(
            Long requestId) {

        PropertyRegistrationRequest entity =
                repository.findById(requestId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Property registration request not found with id: "
                                                + requestId
                                ));

        return mapper.toResponse(entity);

    }

    // ==========================================
    // Approve Registration Request
    // ==========================================

    @Override
    public ApprovePropertyRegistrationResponse approveRegistrationRequest(
            Long requestId) {

        // ==========================================
        // Find Registration Request
        // ==========================================

        PropertyRegistrationRequest registrationRequest =
                repository.findById(requestId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Property registration request not found with id: "
                                                + requestId
                                ));

        // ==========================================
        // Validate Registration Status
        // ==========================================

        if (registrationRequest.getStatus() != RegistrationStatus.PENDING) {

            throw new IllegalStateException(
                    "Only pending registration requests can be approved."
            );

        }

        // ==========================================
        // Check Existing Property Admin
        // ==========================================

        if (userRepository.existsByEmailIgnoreCase(
                registrationRequest.getEmail())) {

            throw new DuplicateResourceException(
                    "A Property Admin already exists with this email."
            );

        }

        // ==========================================
        // Split Contact Person Name
        // ==========================================

        String[] nameParts = splitName(
                registrationRequest.getContactPersonName()
        );

        // ==========================================
        // Create Property Admin User
        // ==========================================

        User propertyAdmin = User.builder()
                .firstName(nameParts[0])
                .lastName(nameParts[1])
                .email(registrationRequest.getEmail())
                .phone(registrationRequest.getPhone())
                .password(
                        passwordEncoder.encode(
                                UUID.randomUUID().toString()
                        )
                )
                .role(UserRole.PROPERTY_ADMIN)
                .isActive(false)
                .build();

        // ==========================================
        // Save Property Admin
        // ==========================================

        propertyAdmin = userRepository.save(propertyAdmin);

        // ==========================================
        // Link Property Admin With Registration Request
        // ==========================================

        registrationRequest.setPropertyAdmin(
                propertyAdmin
        );


        // ==========================================
        // Generate Invitation Token
        // ==========================================

        String token = UUID.randomUUID().toString();

        while (invitationRepository.existsByToken(token)) {
            token = UUID.randomUUID().toString();
        }

        // ==========================================
        // Create Property Admin Invitation
        // ==========================================

        PropertyAdminInvitation invitation =
                PropertyAdminInvitation.builder()
                        .user(propertyAdmin)
                        .token(token)
                        .expiresAt(
                                LocalDateTime.now().plusDays(7)
                        )
                        .isUsed(false)
                        .build();

        // ==========================================
        // Save Invitation
        // ==========================================

        invitationRepository.save(invitation);

        // ==========================================
        // Get Logged-in SUPER_ADMIN
        // ==========================================

        User superAdmin =
                currentUserService.getCurrentUser();

        // ==========================================
        // Update Registration Request
        // ==========================================

        registrationRequest.setStatus(
                RegistrationStatus.APPROVED
        );

        registrationRequest.setRejectionReason(null);

        registrationRequest.setReviewedAt(
                LocalDateTime.now()
        );

        registrationRequest.setReviewedBy(
                superAdmin
        );

        // ==========================================
        // Save Registration Request
        // ==========================================

        repository.save(registrationRequest);

        // ==========================================
        // Build Activation Link
        // ==========================================

        String activationLink =
                "http://localhost:8080/api/property-admin/activate?token="
                        + token;

        // ==========================================
        // Send Registration Approval Email
        // ==========================================

        notificationService.sendRegistrationApprovedEmail(
                registrationRequest,
                activationLink
        );

        // ==========================================
        // Build Response
        // ==========================================

        return ApprovePropertyRegistrationResponse.builder()
                .propertyAdminId(propertyAdmin.getId())
                .propertyAdminEmail(propertyAdmin.getEmail())
                .invitationToken(token)
                .activationLink(activationLink)
                .build();

    }

    // ==========================================
    // Reject Registration Request
    // ==========================================

    @Override
    public void rejectRegistrationRequest(
            Long requestId,
            RejectPropertyRegistrationRequest request) {

        // ==========================================
        // Find Registration Request
        // ==========================================

        PropertyRegistrationRequest registrationRequest =
                repository.findById(requestId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Property registration request not found with id: "
                                                + requestId
                                ));

        // ==========================================
        // Validate Registration Status
        // ==========================================

        if (registrationRequest.getStatus() != RegistrationStatus.PENDING) {

            throw new IllegalStateException(
                    "Only pending registration requests can be rejected."
            );

        }

        // ==========================================
        // Get Logged-in SUPER_ADMIN
        // ==========================================

        User superAdmin =
                currentUserService.getCurrentUser();

        // ==========================================
        // Update Registration Request
        // ==========================================

        registrationRequest.setStatus(
                RegistrationStatus.REJECTED
        );

        registrationRequest.setRejectionReason(
                request.getRejectionReason()
        );

        registrationRequest.setReviewedAt(
                LocalDateTime.now()
        );

        registrationRequest.setReviewedBy(
                superAdmin
        );

        // ==========================================
        // Save Registration Request
        // ==========================================

        repository.save(registrationRequest);

        // ==========================================
        // Send Registration Rejection Email
        // ==========================================

        notificationService.sendRegistrationRejectedEmail(
                registrationRequest
        );

    }

    // ==========================================
    // Helper Methods
    // ==========================================

    private String[] splitName(String fullName) {

        if (fullName == null || fullName.isBlank()) {
            return new String[]{"", ""};
        }

        String[] parts = fullName.trim().split("\\s+", 2);

        if (parts.length == 1) {
            return new String[]{parts[0], ""};
        }

        return parts;

    }

}