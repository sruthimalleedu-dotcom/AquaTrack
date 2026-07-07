-- ==========================================
-- Link Property Registration With Property Admin
-- ==========================================

ALTER TABLE property_registration_requests

ADD COLUMN property_admin_id BIGINT;

ALTER TABLE property_registration_requests

ADD CONSTRAINT fk_property_registration_property_admin

FOREIGN KEY (property_admin_id)

REFERENCES users(id);
