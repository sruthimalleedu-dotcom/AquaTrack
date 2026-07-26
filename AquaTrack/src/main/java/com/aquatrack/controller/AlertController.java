package com.aquatrack.controller;

import com.aquatrack.dto.alert.AlertRequestDto;
import com.aquatrack.dto.alert.AlertResponseDto;
import com.aquatrack.dto.alert.AlertSentResponseDto;
import com.aquatrack.dto.alert.AlertSummaryResponseDto;
import com.aquatrack.service.AlertService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    /**
     * Manager sends alert
     */
    @PostMapping
    public AlertSentResponseDto createAlert(
            @Valid @RequestBody AlertRequestDto requestDto) {

        return alertService.createAlert(requestDto);
    }

    /**
     * Get all alerts of logged-in user
     */
    @GetMapping
    public List<AlertSummaryResponseDto> getMyAlerts() {

        return alertService.getMyAlerts();
    }

    /**
     * Get alert by id
     */
    @GetMapping("/{id}")
    public AlertResponseDto getAlert(
            @PathVariable Long id) {

        return alertService.getAlertById(id);
    }

    /**
     * Mark alert as read
     */
    @PutMapping("/{id}/read")
    public AlertResponseDto markAsRead(
            @PathVariable Long id) {

        return alertService.markAsRead(id);
    }

    /**
     * Get unread alert count
     */
    @GetMapping("/unread-count")
    public long unreadCount() {

        return alertService.getUnreadAlertCount();
    }

    /**
     * Delete alert
     */
    @DeleteMapping("/{id}")
    public void deleteAlert(
            @PathVariable Long id) {

        alertService.deleteAlert(id);
    }
}