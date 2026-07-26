package com.aquatrack.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "aquatrack.mail")
public class AquaTrackMailProperties {

    /**
     * Sender email address.
     */
    private String from;

    /**
     * Sender display name.
     */
    private String senderName;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }
}