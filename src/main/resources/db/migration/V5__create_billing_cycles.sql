CREATE TABLE billing_cycles (

    id BIGSERIAL PRIMARY KEY,

    apartment_id BIGINT NOT NULL,

    cycle_name VARCHAR(100) NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    due_date DATE NOT NULL,

    billing_status VARCHAR(20) NOT NULL DEFAULT 'OPEN',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_billing_apartment
        FOREIGN KEY (apartment_id)
        REFERENCES apartments(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_billing_dates
        CHECK (end_date >= start_date),

    CONSTRAINT chk_billing_status
        CHECK (billing_status IN ('OPEN','CLOSED'))
);

CREATE INDEX idx_billing_apartment
ON billing_cycles(apartment_id);

CREATE INDEX idx_billing_start_date
ON billing_cycles(start_date);

CREATE INDEX idx_billing_end_date
ON billing_cycles(end_date);

CREATE INDEX idx_billing_status
ON billing_cycles(billing_status);