package com.madhavconstruction.madhavconstruction.config;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CorsConfigTests {

    @Test
    void normalizesOriginsAndSupportsProductionDomains() {
        CorsConfigurationSource source = new CorsConfig().corsConfigurationSource(new String[]{
                "https://www.madhavconstruction.in",
                " https://madhavconstruction.in/ ",
                " "
        });
        MockHttpServletRequest request = new MockHttpServletRequest(
                "OPTIONS", "/v2/api/auth/session");

        CorsConfiguration configuration = source.getCorsConfiguration(request);

        assertThat(configuration.getAllowedOrigins()).containsExactly(
                "https://www.madhavconstruction.in",
                "https://madhavconstruction.in"
        );
        assertThat(configuration.getAllowCredentials()).isTrue();
    }

    @Test
    void rejectsEmptyOriginConfiguration() {
        assertThatThrownBy(() -> new CorsConfig().corsConfigurationSource(new String[]{" ", "/"}))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("cors.allowed-origins");
    }
}
