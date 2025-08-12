package org.example.euro_denominator.model;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

/**
 * Model representing the request payload for denomination calculation.
 * Contains the amount in euros that needs to be broken down.
 */
public class DenominationRequest {
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0", message = "Amount must be at least 0")
    @DecimalMax(value = "1000000000000", message = "Amount must be less than 1 trillion")
    private double amount;

    private Map<Integer, Long> previousBreakdown;

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Map<Integer, Long> getPreviousBreakdown() {
        return previousBreakdown;
    }

    public void setPreviousBreakdown(Map<Integer, Long> previousBreakdown) {
        this.previousBreakdown = previousBreakdown;
    }
}
