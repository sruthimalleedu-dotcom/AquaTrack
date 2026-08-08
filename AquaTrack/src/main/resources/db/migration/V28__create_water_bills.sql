CREATE TABLE water_bills (

                             id BIGSERIAL PRIMARY KEY,

                             household_id BIGINT NOT NULL,

                             billing_cycle_id BIGINT NOT NULL,

                             consumption_kl DECIMAL(10,2) NOT NULL,

                             usage_percentage DECIMAL(10,2) NOT NULL,

                             cost_per_kl DECIMAL(10,2) NOT NULL,

                             shared_water_cost DECIMAL(10,2) NOT NULL,

                             tariff_charge DECIMAL(10,2) NOT NULL,

                             adjustment_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,

                             total_amount DECIMAL(10,2) NOT NULL,

                             invoice_number VARCHAR(100) NOT NULL,

                             generated_date DATE NOT NULL,

                             due_date DATE NOT NULL,

                             bill_status VARCHAR(20) NOT NULL,

                             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                             updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                             CONSTRAINT uk_water_bill_household_cycle
                                 UNIQUE (household_id, billing_cycle_id),

                             CONSTRAINT uk_water_bill_invoice
                                 UNIQUE (invoice_number),

                             CONSTRAINT fk_bill_household
                                 FOREIGN KEY (household_id)
                                     REFERENCES households(id)
                                     ON DELETE CASCADE,

                             CONSTRAINT fk_bill_billing_cycle
                                 FOREIGN KEY (billing_cycle_id)
                                     REFERENCES billing_cycles(id)
                                     ON DELETE CASCADE

);

CREATE INDEX idx_water_bill_household
    ON water_bills(household_id);

CREATE INDEX idx_water_bill_billing_cycle
    ON water_bills(billing_cycle_id);

CREATE INDEX idx_water_bill_status
    ON water_bills(bill_status);

CREATE INDEX idx_water_bill_invoice
    ON water_bills(invoice_number);