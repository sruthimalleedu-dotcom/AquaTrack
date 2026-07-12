-- ==========================================================
-- V16__create_buildings.sql
-- Description : Creates buildings table
-- Author      : AquaTrack
-- ==========================================================

CREATE TABLE buildings
(
    id BIGSERIAL PRIMARY KEY,

    building_name VARCHAR(100) NOT NULL,

    building_code VARCHAR(20) NOT NULL,

    building_type VARCHAR(30) NOT NULL DEFAULT 'RESIDENTIAL',

    number_of_floors INTEGER NOT NULL,

    number_of_units INTEGER NOT NULL DEFAULT 0,

    description VARCHAR(500),

    apartment_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_building_apartment
        FOREIGN KEY (apartment_id)
            REFERENCES apartments(id)
            ON DELETE CASCADE,

    CONSTRAINT uk_building_name_per_apartment
        UNIQUE (apartment_id, building_name),

    CONSTRAINT uk_building_code_per_apartment
        UNIQUE (apartment_id, building_code),

    CONSTRAINT chk_building_floors
        CHECK (number_of_floors > 0),

    CONSTRAINT chk_building_units
        CHECK (number_of_units >= 0),

    CONSTRAINT chk_building_type
        CHECK (building_type IN (
            'RESIDENTIAL',
            'COMMERCIAL',
            'MIXED_USE',
            'CLUBHOUSE',
            'PARKING'
        ))
);

CREATE INDEX idx_buildings_apartment
ON buildings(apartment_id);

CREATE INDEX idx_buildings_name
ON buildings(building_name);

CREATE INDEX idx_buildings_code
ON buildings(building_code);