-- =====================================================
-- AquaTrack
-- V7 - Alter Users Table and Add Relationships
-- =====================================================

--------------------------------------------------------
-- Add New Columns
--------------------------------------------------------

ALTER TABLE users
ADD COLUMN apartment_id BIGINT,
ADD COLUMN household_id BIGINT;

--------------------------------------------------------
-- Foreign Key : Apartment
--------------------------------------------------------

ALTER TABLE users
ADD CONSTRAINT fk_user_apartment
FOREIGN KEY (apartment_id)
REFERENCES apartments(id)
ON DELETE SET NULL;

--------------------------------------------------------
-- Foreign Key : Household
--------------------------------------------------------

ALTER TABLE users
ADD CONSTRAINT fk_user_household
FOREIGN KEY (household_id)
REFERENCES households(id)
ON DELETE SET NULL;

--------------------------------------------------------
-- Business Rules
--------------------------------------------------------

ALTER TABLE users
ADD CONSTRAINT chk_user_role
CHECK (role IN ('ADMIN', 'RESIDENT'));

--------------------------------------------------------
-- Indexes
--------------------------------------------------------

CREATE INDEX idx_user_apartment
ON users(apartment_id);

CREATE INDEX idx_user_household
ON users(household_id);