CREATE TABLE bulk_water_purchases (

                                      id BIGSERIAL PRIMARY KEY,

                                      building_id BIGINT NOT NULL,

                                      billing_cycle_id BIGINT NOT NULL,

                                      purchase_date DATE NOT NULL,

                                      source VARCHAR(20) NOT NULL,

                                      volume_kl DECIMAL(10,2) NOT NULL,

                                      unit_cost DECIMAL(10,2) NOT NULL,

                                      total_cost DECIMAL(12,2) NOT NULL,

                                      supplier_name VARCHAR(150),

                                      invoice_number VARCHAR(100),

                                      remarks VARCHAR(500),

                                      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                      CONSTRAINT fk_bulk_water_purchase_building
                                          FOREIGN KEY (building_id)
                                              REFERENCES buildings(id)
                                              ON DELETE CASCADE,

                                      CONSTRAINT fk_bulk_water_purchase_billing_cycle
                                          FOREIGN KEY (billing_cycle_id)
                                              REFERENCES billing_cycles(id)
                                              ON DELETE CASCADE

);