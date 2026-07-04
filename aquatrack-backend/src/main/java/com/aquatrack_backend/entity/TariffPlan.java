package com.aquatrack_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tariff_plans")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class TariffPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double baseRate;
    private Double baseTierLimit;
    private Double excessRate;

    @OneToOne
    private Apartment apartment;
}