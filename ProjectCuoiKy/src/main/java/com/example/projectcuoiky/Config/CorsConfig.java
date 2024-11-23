package com.example.projectcuoiky.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Cho phép tất cả các URL
                        .allowedOrigins("http://localhost:3000") // Cho phép domain của React
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Cho phép các HTTP Method
                        .allowedHeaders("*") // Cho phép tất cả header
                        .allowCredentials(true); // Cho phép gửi cookie
            }
        };
    }
}