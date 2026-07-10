package com.aquatrack_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity //tells Spring this class becomes a database table
@Table(name = "registration_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder //allows RegistrationRequest.builder()
public class RegistrationRequest {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //auto-increment ID

    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    private String phone;

    private String buildingName;

    private String apartmentNumber;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;
}