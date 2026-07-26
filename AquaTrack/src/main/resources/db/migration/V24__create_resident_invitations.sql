-- ==========================================================
-- V24__create_resident_invitations.sql
-- Description : Creates resident invitations table
-- Author      : AquaTrack
-- ==========================================================

CREATE TABLE resident_invitations
(
    id BIGSERIAL PRIMARY KEY,

    invitation_token VARCHAR(100) NOT NULL UNIQUE,

    resident_id BIGINT NOT NULL UNIQUE,

    household_id BIGINT NOT NULL,

    invited_by BIGINT NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',

    expires_at TIMESTAMP NOT NULL,

    activated_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_resident_invitation_resident
        FOREIGN KEY (resident_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_resident_invitation_household
        FOREIGN KEY (household_id)
            REFERENCES households(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_resident_invitation_manager
        FOREIGN KEY (invited_by)
            REFERENCES users(id)
            ON DELETE RESTRICT
);

CREATE INDEX idx_resident_invitation_token
    ON resident_invitations(invitation_token);

CREATE INDEX idx_resident_invitation_status
    ON resident_invitations(status);

CREATE INDEX idx_resident_invitation_household
    ON resident_invitations(household_id);

CREATE INDEX idx_resident_invitation_invited_by
    ON resident_invitations(invited_by);

CREATE INDEX idx_resident_invitation_resident
    ON resident_invitations(resident_id);