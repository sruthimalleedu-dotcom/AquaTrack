-- ==========================================
-- Drop Existing Role Constraint
-- ==========================================

ALTER TABLE users
DROP CONSTRAINT chk_user_role;

-- ==========================================
-- Add Updated Role Constraint
-- ==========================================

ALTER TABLE users
ADD CONSTRAINT chk_user_role
CHECK (
    role IN (
        'SUPER_ADMIN',
        'PROPERTY_ADMIN',
        'MANAGER',
        'RESIDENT'
    )
);