-- =====================================================
-- AquaTrack
-- V4 - Create Billing Cycles Table
-- =====================================================

CREATE TABLE tariff_plans (

    id BIGSERIAL PRIMARY KEY,

    apartment_id BIGINT NOT NULL,

    plan_name VARCHAR(100) NOT NULL,

    base_rate DECIMAL(10,2) NOT NULL,

    slab1_limit DECIMAL(10,2) NOT NULL,

    slab1_rate DECIMAL(10,2) NOT NULL,

    slab2_limit DECIMAL(10,2) NOT NULL,

    slab2_rate DECIMAL(10,2) NOT NULL,

    slab3_rate DECIMAL(10,2) NOT NULL,

    effective_from DATE NOT NULL,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tariff_apartment
        FOREIGN KEY (apartment_id)
        REFERENCES apartments(id)
        ON DELETE CASCADE

);

-- =====================================================
-- Indexes
-- =====================================================

CREATE INDEX idx_tariff_apartment
ON tariff_plans(apartment_id);

CREATE INDEX idx_tariff_effective_date
ON tariff_plans(effective_from);

CREATE INDEX idx_tariff_active
ON tariff_plans(active);