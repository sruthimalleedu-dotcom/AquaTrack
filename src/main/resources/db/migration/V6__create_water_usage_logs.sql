-- =====================================================
-- AquaTrack
-- V6 - Create Water Usage Logs Table
-- =====================================================

CREATE TABLE water_usage_logs (

    id BIGSERIAL PRIMARY KEY,

    household_id BIGINT NOT NULL,

    billing_cycle_id BIGINT NOT NULL,

    reading_date DATE NOT NULL,

    previous_reading DECIMAL(10,2) NOT NULL,

    current_reading DECIMAL(10,2) NOT NULL,

    water_usage DECIMAL(10,2) NOT NULL,

    uploaded_by BIGINT,

    upload_type VARCHAR(20) NOT NULL DEFAULT 'MANUAL',

    remarks VARCHAR(255),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    ---------------------------------------------------
    -- Foreign Keys
    ---------------------------------------------------

    CONSTRAINT fk_usage_household
        FOREIGN KEY (household_id)
        REFERENCES households(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_usage_billing_cycle
        FOREIGN KEY (billing_cycle_id)
        REFERENCES billing_cycles(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_usage_uploaded_by
        FOREIGN KEY (uploaded_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    ---------------------------------------------------
    -- Validation
    ---------------------------------------------------

    CONSTRAINT chk_current_reading
        CHECK (current_reading >= previous_reading),

    CONSTRAINT chk_water_usage
        CHECK (water_usage >= 0),

    CONSTRAINT chk_upload_type
        CHECK (upload_type IN ('MANUAL', 'CSV'))

);

--------------------------------------------------------
-- Duplicate Reading Prevention
--------------------------------------------------------

ALTER TABLE water_usage_logs
ADD CONSTRAINT uq_household_reading_date
UNIQUE (household_id, reading_date);

--------------------------------------------------------
-- Indexes
--------------------------------------------------------

CREATE INDEX idx_usage_household
ON water_usage_logs(household_id);

CREATE INDEX idx_usage_billing_cycle
ON water_usage_logs(billing_cycle_id);

CREATE INDEX idx_usage_reading_date
ON water_usage_logs(reading_date);

CREATE INDEX idx_usage_uploaded_by
ON water_usage_logs(uploaded_by);

CREATE INDEX idx_usage_upload_type
ON water_usage_logs(upload_type);