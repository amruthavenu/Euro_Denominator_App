package org.example.euro_denominator.model;

import java.util.Map;

/**
 * Model representing the response for a denomination calculation request.
 * Contains the computed denomination breakdown and its difference from the previous result.
 */
public class DenominationResponse {
    private Map<Integer, Long> breakdown;
    private Map<Integer, Long> differenceFromPrevious;

    public Map<Integer, Long> getBreakdown() {
        return breakdown;
    }

    public void setBreakdown(Map<Integer, Long> breakdown) {
        this.breakdown = breakdown;
    }

    public Map<Integer, Long> getDifferenceFromPrevious() {
        return differenceFromPrevious;
    }

    public void setDifferenceFromPrevious(Map<Integer, Long> differenceFromPrevious) {
        this.differenceFromPrevious = differenceFromPrevious;
    }
}
