-- ============================================
-- AquaTrack
-- V3 - Create Households Table
-- ============================================

CREATE TABLE households (

    id BIGSERIAL PRIMARY KEY,

    apartment_id BIGINT NOT NULL,

    house_number VARCHAR(20) NOT NULL,

    floor INTEGER NOT NULL,

    meter_number VARCHAR(100) NOT NULL UNIQUE,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_household_apartment
        FOREIGN KEY (apartment_id)
        REFERENCES apartments(id)
        ON DELETE CASCADE

);

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX idx_household_apartment
ON households(apartment_id);

CREATE INDEX idx_household_meter
ON households(meter_number);

CREATE INDEX idx_household_number
ON households(house_number);