package com.aquatrack.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "water_usage_logs")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class WaterUsageLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate readingDate;

    private Double readingValue;

    private String source; // MANUAL or CSV

    @ManyToOne
    @JoinColumn(name = "household_id")
    private Household household;
}