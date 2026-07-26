package com.aquatrack.notification.template;

import com.aquatrack.notification.model.ResidentInvitationEmailModel;
import org.springframework.stereotype.Component;

@Component
public class ResidentInvitationTemplate {

    public String build(
            ResidentInvitationEmailModel model
    ) {

        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>AquaTrack Resident Invitation</title>
                </head>

                <body style="font-family: Arial, Helvetica, sans-serif;
                             background:#f4f6f9;
                             margin:0;
                             padding:40px;">

                    <table width="100%%"
                           cellpadding="0"
                           cellspacing="0">

                        <tr>
                            <td align="center">

                                <table width="650"
                                       cellpadding="30"
                                       cellspacing="0"
                                       style="background:#ffffff;
                                              border-radius:10px;">

                                    <tr>
                                        <td>

                                            <h2 style="color:#1976D2;">
                                                AquaTrack
                                            </h2>

                                            <h3>
                                                Resident Account Invitation
                                            </h3>

                                            <p>
                                                Hello <b>%s</b>,
                                            </p>

                                            <p>
                                                You have been invited to activate
                                                your AquaTrack Resident account.
                                            </p>

                                            <table cellpadding="8">

                                                <tr>
                                                    <td><b>Apartment</b></td>
                                                    <td>%s</td>
                                                </tr>

                                                <tr>
                                                    <td><b>Building</b></td>
                                                    <td>%s</td>
                                                </tr>

                                                <tr>
                                                    <td><b>Household</b></td>
                                                    <td>%s</td>
                                                </tr>

                                            </table>

                                            <br>

                                            <a href="%s"
                                               style="
                                               background:#1976D2;
                                               color:white;
                                               padding:14px 26px;
                                               text-decoration:none;
                                               border-radius:6px;
                                               display:inline-block;">

                                                Activate Account

                                            </a>

                                            <br><br>

                                            <p>
                                                This invitation expires in
                                                <b>24 hours</b>.
                                            </p>

                                            <hr>

                                            <p style="font-size:12px;color:#666;">
                                                If you were not expecting this
                                                invitation, you can safely ignore
                                                this email.
                                            </p>

                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>

                    </table>

                </body>
                </html>
                """.formatted(
                model.getResidentName(),
                model.getApartmentName(),
                model.getBuildingName(),
                model.getHouseholdNumber(),
                model.getActivationUrl()
        );

    }

}