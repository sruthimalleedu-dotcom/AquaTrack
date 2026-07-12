ALTER TABLE property_registration_requests
ADD COLUMN rejection_reason VARCHAR(500);

ALTER TABLE property_registration_requests
ADD COLUMN reviewed_at TIMESTAMP;

ALTER TABLE property_registration_requests
ADD COLUMN reviewed_by BIGINT;

ALTER TABLE property_registration_requests
ADD CONSTRAINT fk_property_registration_reviewed_by
FOREIGN KEY (reviewed_by)
REFERENCES users(id);