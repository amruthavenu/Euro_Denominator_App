package org.example.euro_denominator.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.euro_denominator.model.DenominationRequest;
import org.example.euro_denominator.model.DenominationResponse;
import org.example.euro_denominator.service.DenominationService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DenominationController.class)
class DenominationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private DenominationService denominationService;

    @Test
    void shouldReturnBreakdownResponse() throws Exception {
        // Mocking expected behavior
        DenominationResponse mockResponse = new DenominationResponse();
        mockResponse.setBreakdown(Map.of(2000, 1L));
        mockResponse.setDifferenceFromPrevious(Map.of(2000, 1L));

        Mockito.when(denominationService.calculateBreakdown(20.0))
                .thenReturn(mockResponse.getBreakdown());

        // Act & Assert
        mockMvc.perform(post("/api/denominations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"amount\": 20.0}"))
                .andExpect(status().isOk());
    }
}
