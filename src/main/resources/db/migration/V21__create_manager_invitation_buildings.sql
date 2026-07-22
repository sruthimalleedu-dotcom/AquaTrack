-- ==========================================
-- Create Manager Invitation Buildings
-- ==========================================

CREATE TABLE manager_invitation_buildings (

                                              id BIGSERIAL PRIMARY KEY,

                                              manager_invitation_id BIGINT NOT NULL,

                                              building_id BIGINT NOT NULL,

                                              created_at TIMESTAMP NOT NULL,

                                              updated_at TIMESTAMP NOT NULL,

                                              CONSTRAINT fk_manager_invitation_building_invitation
                                                  FOREIGN KEY (manager_invitation_id)
                                                      REFERENCES manager_invitations(id)
                                                      ON DELETE CASCADE,

                                              CONSTRAINT fk_manager_invitation_building_building
                                                  FOREIGN KEY (building_id)
                                                      REFERENCES buildings(id)
                                                      ON DELETE CASCADE,

                                              CONSTRAINT uk_invitation_building
                                                  UNIQUE (
                                                          manager_invitation_id,
                                                          building_id
                                                      )

);