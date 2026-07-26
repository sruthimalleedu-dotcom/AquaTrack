package com.aquatrack.notification.template;

public final class BaseEmailTemplate {

    private BaseEmailTemplate() {
    }

    public static String buildTemplate(
            String title,
            String content
    ) {

        return """
                <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport"
                          content="width=device-width, initial-scale=1.0">

                    <title>%s</title>
                </head>

                <body style="
                        margin:0;
                        padding:0;
                        background:#f4f6f9;
                        font-family:Arial, Helvetica, sans-serif;">

                    <table width="100%%"
                           cellpadding="0"
                           cellspacing="0"
                           style="padding:40px 0;">

                        <tr>
                            <td align="center">

                                <table width="650"
                                       cellpadding="0"
                                       cellspacing="0"
                                       style="
                                            background:#ffffff;
                                            border-radius:12px;
                                            overflow:hidden;
                                            box-shadow:0 2px 8px rgba(0,0,0,.08);">

                                    <!-- Header -->

                                    <tr>
                                        <td style="
                                                background:#1565C0;
                                                color:white;
                                                text-align:center;
                                                padding:28px;">

                                            <h1 style="margin:0;">
                                                💧 AquaTrack
                                            </h1>

                                            <p style="margin-top:8px;font-size:14px;">
                                                Smart Apartment Water Usage
                                                Management System
                                            </p>

                                        </td>
                                    </tr>

                                    <!-- Body -->

                                    <tr>
                                        <td style="padding:40px;">

                                            %s

                                        </td>
                                    </tr>

                                    <!-- Footer -->

                                    <tr>
                                        <td style="
                                                background:#F5F5F5;
                                                padding:25px;
                                                text-align:center;
                                                font-size:13px;
                                                color:#777777;">

                                            <strong>AquaTrack</strong>

                                            <br><br>

                                            Enterprise Apartment Water
                                            Management Platform

                                            <br><br>

                                            © 2026 AquaTrack.
                                            All Rights Reserved.

                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>

                    </table>

                </body>

                </html>
                """.formatted(title, content);

    }

}