package com.aquatrack.notification.model;

import java.util.List;

public class EmailDetails {

    /**
     * Primary recipient.
     */
    private String to;

    /**
     * Carbon copy recipients.
     */
    private List<String> cc;

    /**
     * Blind carbon copy recipients.
     */
    private List<String> bcc;

    /**
     * Email subject.
     */
    private String subject;

    /**
     * Email body (Plain text or HTML).
     */
    private String body;

    /**
     * True if body contains HTML content.
     */
    private boolean html;

    public EmailDetails() {
    }

    public EmailDetails(String to, String subject, String body) {
        this.to = to;
        this.subject = subject;
        this.body = body;
        this.html = false;
    }

    public EmailDetails(String to, String subject, String body, boolean html) {
        this.to = to;
        this.subject = subject;
        this.body = body;
        this.html = html;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public List<String> getCc() {
        return cc;
    }

    public void setCc(List<String> cc) {
        this.cc = cc;
    }

    public List<String> getBcc() {
        return bcc;
    }

    public void setBcc(List<String> bcc) {
        this.bcc = bcc;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public boolean isHtml() {
        return html;
    }

    public void setHtml(boolean html) {
        this.html = html;
    }

    /**
     * Returns true if CC recipients are available.
     */
    public boolean hasCc() {
        return cc != null && !cc.isEmpty();
    }

    /**
     * Returns true if BCC recipients are available.
     */
    public boolean hasBcc() {
        return bcc != null && !bcc.isEmpty();
    }

    @Override
    public String toString() {
        return "EmailDetails{" +
                "to='" + to + '\'' +
                ", subject='" + subject + '\'' +
                ", html=" + html +
                '}';
    }
}