-- ==========================================
-- Add Building Reference to Users
-- ==========================================

ALTER TABLE users
ADD COLUMN building_id BIGINT;

ALTER TABLE users
ADD CONSTRAINT fk_users_building
FOREIGN KEY (building_id)
REFERENCES buildings(id);