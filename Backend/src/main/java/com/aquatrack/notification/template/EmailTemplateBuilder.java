package com.aquatrack.notification.template;

public class EmailTemplateBuilder {

    private final StringBuilder html = new StringBuilder();

    private EmailTemplateBuilder() {
    }

    public static EmailTemplateBuilder builder() {
        return new EmailTemplateBuilder();
    }

    public EmailTemplateBuilder greeting(String name) {

        html.append("""
                <h2 style="color:#1565C0;">
                    Hello %s,
                </h2>
                """.formatted(name));

        return this;
    }

    public EmailTemplateBuilder message(String message) {

        html.append("""
                <p style="
                    font-size:15px;
                    line-height:1.8;
                    color:#444444;">
                    %s
                </p>
                """.formatted(message));

        return this;
    }

    public EmailTemplateBuilder successBox(String message) {

        html.append("""
                <div style="
                    background:#E8F5E9;
                    border-left:5px solid #2E7D32;
                    padding:18px;
                    margin:25px 0;
                    border-radius:6px;">

                    <strong style="color:#2E7D32;">
                        %s
                    </strong>

                </div>
                """.formatted(message));

        return this;
    }

    public EmailTemplateBuilder warningBox(String message) {

        html.append("""
                <div style="
                    background:#FFF8E1;
                    border-left:5px solid #F9A825;
                    padding:18px;
                    margin:25px 0;
                    border-radius:6px;">

                    <strong style="color:#F57F17;">
                        %s
                    </strong>

                </div>
                """.formatted(message));

        return this;
    }

    public EmailTemplateBuilder button(
            String text,
            String url
    ) {

        html.append("""
                <div style="margin:35px 0;">

                    <a href="%s"
                       style="
                            background:#1565C0;
                            color:white;
                            text-decoration:none;
                            padding:14px 28px;
                            border-radius:6px;
                            display:inline-block;
                            font-weight:bold;">

                        %s

                    </a>

                </div>
                """.formatted(url, text));

        return this;
    }

    public EmailTemplateBuilder divider() {

        html.append("""
                <hr style="
                    border:none;
                    border-top:1px solid #E0E0E0;
                    margin:30px 0;">
                """);

        return this;
    }

    public EmailTemplateBuilder closing() {

        html.append("""
                <p style="margin-top:35px;">

                    Regards,<br>

                    <strong>AquaTrack Team</strong>

                </p>
                """);

        return this;
    }

    public String build() {

        return html.toString();

    }

}
