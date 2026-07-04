-- =====================================================
-- Add Property Admin Relationship to Apartments
-- =====================================================

ALTER TABLE apartments
ADD COLUMN property_admin_id BIGINT;

-- =====================================================
-- Foreign Key Constraint
-- =====================================================

ALTER TABLE apartments
ADD CONSTRAINT fk_apartment_property_admin
FOREIGN KEY (property_admin_id)
REFERENCES users(id)
ON DELETE SET NULL;