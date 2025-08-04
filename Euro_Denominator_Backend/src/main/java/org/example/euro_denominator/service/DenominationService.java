package org.example.euro_denominator.service;

import org.example.euro_denominator.model.DenominationResponse;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service class responsible for calculating the optimal denomination breakdown of a given amount,
 * comparing the result with the previous breakdown, and returning the differences.
 * <p>
 * This class handles logic for:
 * Converting euro amounts (in double) to cents (int) for accurate calculation.</li>
 * Generating the minimal number of euro bills and coins for a given amount.</li>
 * Storing and comparing with the previous calculation to return a difference map.</li>
 */
@Service
public class DenominationService {

    // Available denominations in descending order
    private static final Integer[] DENOMINATIONS_IN_CENTS = {
            50000, 20000, 10000, 5000, 2000, 1000, 500,
            200, 100, 50, 20, 10, 5, 2, 1
    };


    private Map<Integer, Integer> previousBreakdown = null;

    /**
     * Calculates the optimal denomination breakdown for a given amount in euros.
     * Converts the amount to cents and uses the least number of coins/bills.
     *
     * @param amount The amount in euros to break down. Must be a positive, finite number.
     * @return A map representing the count of each denomination used (in cents).
     */
    public Map<Integer, Integer> calculateBreakdown(double amount) {
        int amountInCents = (int) Math.round(amount * 100);
        Map<Integer, Integer> result = new LinkedHashMap<>(); // to maintain order

        for (Integer denomination : DENOMINATIONS_IN_CENTS) {
            int count = amountInCents / denomination;
            if (count > 0) {
                result.put(denomination, count);
                amountInCents -= count * denomination;
            }
        }
        return result;

    }

    /**
     * Compares the current denomination breakdown with the previously calculated one.
     * Calculates the difference in count for each denomination (positive, negative, or unchanged).
     *
     * @param current The current denomination breakdown to compare (in cents).
     * @return A map of denomination differences, or null if no previous breakdown exists.
     * @throws IllegalArgumentException if the current breakdown is null.
     */
    public Map<Integer, Integer> compareWithPrevious(Map<Integer, Integer> current) {

        if (current == null) {
            throw new IllegalArgumentException("Current Breakdown cannot be null");
        }
        if (previousBreakdown == null) {
            return null;
        }

        Map<Integer, Integer> difference = new LinkedHashMap<>();
        Set<Integer> allKeys = new TreeSet<>(); // Sorted for readability
        allKeys.addAll(current.keySet());
        allKeys.addAll(previousBreakdown.keySet());

        for (Integer denomination : allKeys) {
            int prevCount = previousBreakdown.getOrDefault(denomination, 0);
            int currCount = current.getOrDefault(denomination, 0);
            int diff = currCount - prevCount;
            difference.put(denomination, diff);
        }
        return difference;
    }

    /**
     * Updates the previous breakdown state with the current breakdown and returns a response object.
     * Also sets the difference from the previous breakdown in the response.
     *
     * @param current    The current denomination breakdown (in cents).
     * @param difference The calculated difference from the previous breakdown (may be null).
     * @return A response object containing the current breakdown and the difference.
     * @throws IllegalArgumentException if the current breakdown is null.
     */
    public DenominationResponse updatePrevious(Map<Integer, Integer> current, Map<Integer, Integer> difference) {
        if (current == null) {
            throw new IllegalArgumentException("Current breakdown cannot be null.");
        }
        DenominationResponse response = new DenominationResponse();
        response.setBreakdown(current);
        response.setDifferenceFromPrevious(difference);
        previousBreakdown = new HashMap<>(current);
        return response;
    }
}
