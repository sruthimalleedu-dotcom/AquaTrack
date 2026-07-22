-- ==========================================================
-- V22__create_floors.sql
-- Description : Creates floors table
-- Author      : AquaTrack
-- ==========================================================

CREATE TABLE floors
(
    id BIGSERIAL PRIMARY KEY,

    floor_name VARCHAR(50) NOT NULL,

    floor_number INTEGER NOT NULL,

    building_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_floor_building
        FOREIGN KEY (building_id)
            REFERENCES buildings(id)
            ON DELETE CASCADE,

    CONSTRAINT uk_floor_name_per_building
        UNIQUE (building_id, floor_name),

    CONSTRAINT uk_floor_number_per_building
        UNIQUE (building_id, floor_number),

    CONSTRAINT chk_floor_number
        CHECK (floor_number >= 0)
);

CREATE INDEX idx_floors_building
    ON floors(building_id);

CREATE INDEX idx_floors_name
    ON floors(floor_name);

CREATE INDEX idx_floors_number
    ON floors(floor_number);