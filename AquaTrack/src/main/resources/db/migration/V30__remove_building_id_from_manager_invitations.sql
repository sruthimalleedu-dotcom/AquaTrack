-- ==========================================
-- Remove obsolete building_id from
-- manager_invitations
-- ==========================================

ALTER TABLE manager_invitations
DROP CONSTRAINT IF EXISTS fk_manager_invitation_building;

ALTER TABLE manager_invitations
DROP COLUMN IF EXISTS building_id;