package org.example.euro_denominator.controller;

import org.example.euro_denominator.model.DenominationRequest;
import org.example.euro_denominator.model.DenominationResponse;
import org.example.euro_denominator.service.DenominationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Map;

/**
 * REST controller that handles requests for calculating Euro denomination breakdowns.
 * <p>
 * Exposes a POST endpoint that receives an amount in euros and returns:
 * - The optimal breakdown using the fewest number of bills and coins.
 * - The difference compared to the previously calculated breakdown.
 */
@Validated
@RestController
@RequestMapping("/api/denominations")
@CrossOrigin
public class DenominationController {

    @Autowired
    private DenominationService denominationService;

    /**
     * Endpoint to calculate denomination breakdown for a given amount.
     *
     * @param request The request containing the amount to be broken down.
     * @return A {@link DenominationResponse} with the calculated breakdown and its difference from the previous one.
     */
    @PostMapping
    public DenominationResponse calculate(@Validated @RequestBody DenominationRequest request) {

        if (request == null) {
            throw new IllegalArgumentException("Invalid request");
        }
        Map<Integer, Long> previous = request.getPreviousBreakdown();
        double amount = request.getAmount();

        try {
            Map<Integer, Long> breakdown = denominationService.calculateBreakdown(amount);
            Map<Integer, Long> difference = denominationService.compareWithPrevious(breakdown, previous);
            return denominationService.createResponse(breakdown, difference);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to calculate denomination breakdown: " + ex.getMessage(), ex);
        }
    }
}
