CREATE TABLE manager_buildings (

                                   id BIGSERIAL PRIMARY KEY,

                                   manager_id BIGINT NOT NULL,

                                   building_id BIGINT NOT NULL,

                                   assigned_by BIGINT NOT NULL,

                                   assigned_at TIMESTAMP NOT NULL,

                                   created_at TIMESTAMP NOT NULL,

                                   updated_at TIMESTAMP NOT NULL,

                                   CONSTRAINT fk_manager_building_manager
                                       FOREIGN KEY (manager_id)
                                           REFERENCES users(id),

                                   CONSTRAINT fk_manager_building_building
                                       FOREIGN KEY (building_id)
                                           REFERENCES buildings(id),

                                   CONSTRAINT fk_manager_building_assigned_by
                                       FOREIGN KEY (assigned_by)
                                           REFERENCES users(id),

                                   CONSTRAINT uk_manager_building
                                       UNIQUE (manager_id, building_id)

);