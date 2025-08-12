package org.example.euro_denominator.service;

import static org.junit.jupiter.api.Assertions.*;

import org.example.euro_denominator.model.DenominationResponse;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class DenominationServiceTest {

    private final DenominationService service = new DenominationService();

    @Test
    void testCalculateBreakdown_valid() {
        double amount = 186.73;
        Map<Integer, Long> result = service.calculateBreakdown(amount);

        assertThat(result.get(10000)).isEqualTo(1);
        assertThat(result.get(5000)).isEqualTo(1);
        assertThat(result.get(2000)).isEqualTo(1);
        assertThat(result.get(1000)).isEqualTo(1);
        assertThat(result.get(500)).isEqualTo(1);
        assertThat(result.get(100)).isEqualTo(1);
        assertThat(result.get(50)).isEqualTo(1);
        assertThat(result.get(20)).isEqualTo(1);
        assertThat(result.get(2)).isEqualTo(1);
        assertThat(result.get(1)).isEqualTo(1);
    }

    @Test
    void testCalculateBreakdown_zeroAmount() {
        Map<Integer, Long> result = service.calculateBreakdown(0.0);
        assertTrue(result.isEmpty());
    }

    @Test
    void testCalculateBreakdown_inValidAmount() {
        Map<Integer, Long> result = service.calculateBreakdown(-12);
        assertTrue(result.isEmpty());
    }

    @Test
    void testCalculateBreakdown_inValidAmount_DoubleMax() {
        Map<Integer, Long> result = service.calculateBreakdown(Double.MAX_VALUE);
        assertTrue(result.isEmpty());
    }

    @Test
    void testCompareWithPrevious_whenPreviousIsNull_returnsNull() {
        Map<Integer, Long> current = Map.of(2000, 1L);
        Map<Integer, Long> result = service.compareWithPrevious(current, null);
        assertNull(result);
    }

    @Test
    void testCompareWithPrevious_validComparison() {
        Map<Integer, Long> previous = Map.of(2000, 1L, 1000, 2L);
        Map<Integer, Long> current = Map.of(2000, 2L, 500, 1L);

        // manually set previous
        service.createResponse(previous, null);

        Map<Integer, Long> difference = service.compareWithPrevious(current,previous);

        assertEquals(3, difference.size());
        assertEquals(1, difference.get(2000));  // 2 - 1
        assertEquals(-2, difference.get(1000)); // 0 - 2
        assertEquals(1, difference.get(500));   // 1 - 0
    }

    @Test
    void testUpdatePrevious_setsBreakdownAndDifference() {
        Map<Integer, Long> current = Map.of(10000, 1L, 2000, 2L);
        Map<Integer, Long> difference = Map.of(10000, 1L, 2000, 1L);

        DenominationResponse response = service.createResponse(current, difference);

        assertEquals(current, response.getBreakdown());
        assertEquals(difference, response.getDifferenceFromPrevious());

        Map<Integer, Long> newComparison = Map.of(10000, 1L, 2000, 3L);
        Map<Integer, Long> result = service.compareWithPrevious(newComparison, current);
        assertEquals(1, result.get(2000));
    }

    @Test
    void testCompareWithPrevious_CurrentBreakdownNull_throwsException() {
        assertThrows(IllegalArgumentException.class, () -> service.compareWithPrevious(null, null));
    }

    @Test
    void testCalculateBreakdown_oneTrillion() {
        Map<Integer, Long> result = service.calculateBreakdown(1_000_000_000_000.00);
        assertEquals(5_000_000_000L, result.get(20000));
    }
}
