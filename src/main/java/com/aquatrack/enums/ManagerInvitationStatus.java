package com.aquatrack.enums;

/**
 * Represents the current status of a manager invitation.
 */
public enum ManagerInvitationStatus {

    /**
     * Invitation has been created but
     * the manager has not activated the account.
     */
    PENDING,

    /**
     * Manager has successfully activated
     * the account.
     */
    ACTIVATED,

    /**
     * Invitation has expired.
     */
    EXPIRED,

    /**
     * Invitation has been cancelled
     * by the Property Admin.
     */
    CANCELLED

}
