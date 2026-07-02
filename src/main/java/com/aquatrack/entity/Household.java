package com.aquatrack.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "households")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Household {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String flatNumber;

    private Double flatSize;

    private Integer occupancy;

    @ManyToOne
    @JoinColumn(name = "apartment_id")
    private Apartment apartment;
}