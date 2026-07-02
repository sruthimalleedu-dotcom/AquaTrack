-- ============================================
-- AquaTrack
-- V2 - Create Apartments Table
-- ============================================

CREATE TABLE apartments (

    id BIGSERIAL PRIMARY KEY,

    apartment_name VARCHAR(150) NOT NULL,

    address_line1 VARCHAR(255) NOT NULL,

    address_line2 VARCHAR(255),

    city VARCHAR(100) NOT NULL,

    state VARCHAR(100) NOT NULL,

    pincode VARCHAR(10) NOT NULL,

    total_households INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX idx_apartment_city
ON apartments(city);

CREATE INDEX idx_apartment_name
ON apartments(apartment_name);