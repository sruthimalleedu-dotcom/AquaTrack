-- ==========================================
-- Allow password to be null for users
-- who have not activated their account yet
-- ==========================================

ALTER TABLE users
    ALTER COLUMN password DROP NOT NULL;