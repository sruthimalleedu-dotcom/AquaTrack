CREATE TABLE invoices (

                          id BIGSERIAL PRIMARY KEY,

                          household_id BIGINT NOT NULL,

                          billing_cycle_id BIGINT NOT NULL,

                          consumption DOUBLE PRECISION NOT NULL,

                          base_charge DOUBLE PRECISION NOT NULL,

                          shared_allocation DOUBLE PRECISION NOT NULL,

                          adjustments DOUBLE PRECISION NOT NULL DEFAULT 0,

                          total_amount DOUBLE PRECISION NOT NULL,

                          paid BOOLEAN NOT NULL DEFAULT FALSE,

                          created_at TIMESTAMP NOT NULL,

                          updated_at TIMESTAMP NOT NULL,

                          CONSTRAINT fk_invoice_household
                              FOREIGN KEY (household_id)
                                  REFERENCES households(id),

                          CONSTRAINT fk_invoice_billing_cycle
                              FOREIGN KEY (billing_cycle_id)
                                  REFERENCES billing_cycles(id)

);