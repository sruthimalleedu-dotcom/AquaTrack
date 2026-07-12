-- ==========================================
-- Create Manager Invitations Table
-- ==========================================

CREATE TABLE manager_invitations (

    -- ==========================
    -- Primary Key
    -- ==========================

    id BIGSERIAL PRIMARY KEY,

    -- ==========================
    -- Manager Information
    -- ==========================

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100),

    email VARCHAR(255) NOT NULL,

    phone VARCHAR(15),

    -- ==========================
    -- Invitation Details
    -- ==========================

    invitation_token VARCHAR(255) NOT NULL UNIQUE,

    status VARCHAR(30) NOT NULL,

    expires_at TIMESTAMP NOT NULL,

    -- ==========================
    -- Relationships
    -- ==========================

    apartment_id BIGINT NOT NULL,

    building_id BIGINT NOT NULL,

    invited_by BIGINT NOT NULL,

    -- ==========================
    -- Audit Fields
    -- ==========================
    activated_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    -- ==========================
    -- Foreign Keys
    -- ==========================

    CONSTRAINT fk_manager_invitation_apartment
        FOREIGN KEY (apartment_id)
        REFERENCES apartments(id),

    CONSTRAINT fk_manager_invitation_building
        FOREIGN KEY (building_id)
        REFERENCES buildings(id),

    CONSTRAINT fk_manager_invitation_property_admin
        FOREIGN KEY (invited_by)
        REFERENCES users(id)

);