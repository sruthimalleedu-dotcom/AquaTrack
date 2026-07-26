-- ===========================================================
-- V23__alter_households_add_floor.sql
-- Purpose:
-- Introduce Floor relationship for Households
-- ===========================================================

-- ===========================================================
-- Step 1 : Add floor_id
-- ===========================================================

ALTER TABLE households
    ADD COLUMN floor_id BIGINT;

-- ===========================================================
-- Step 2 : Foreign Key
-- ===========================================================

ALTER TABLE households
    ADD CONSTRAINT fk_household_floor
        FOREIGN KEY (floor_id)
            REFERENCES floors(id)
            ON DELETE RESTRICT;

-- ===========================================================
-- Step 3 : Index
-- ===========================================================

CREATE INDEX idx_household_floor
    ON households(floor_id);

-- ===========================================================
-- NOTE
-- ===========================================================
--
-- The following columns are intentionally kept for now:
--
--   floor
--   meter_number
--
-- They will be removed in a later migration after:
--
--   • Household entity migration is complete
--   • Water Meter module is introduced
--   • Existing data (if any) is migrated
--
-- This keeps the application stable during incremental development.
--
-- ===========================================================