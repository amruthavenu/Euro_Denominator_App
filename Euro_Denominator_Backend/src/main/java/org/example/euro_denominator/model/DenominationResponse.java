package org.example.euro_denominator.model;

import java.util.Map;

/**
 * Model representing the response for a denomination calculation request.
 * Contains the computed denomination breakdown and its difference from the previous result.
 */
public class DenominationResponse {
    private Map<Integer, Integer> breakdown;
    private Map<Integer, Integer> differenceFromPrevious;

    public Map<Integer, Integer> getBreakdown() {
        return breakdown;
    }

    public void setBreakdown(Map<Integer, Integer> breakdown) {
        this.breakdown = breakdown;
    }

    public Map<Integer, Integer> getDifferenceFromPrevious() {
        return differenceFromPrevious;
    }

    public void setDifferenceFromPrevious(Map<Integer, Integer> differenceFromPrevious) {
        this.differenceFromPrevious = differenceFromPrevious;
    }
}
