package com.nghuytan.carmanager.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.nghuytan.carmanager.security.CustomUserDetailsService;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll() // Không yêu cầu đăng nhập
                        .requestMatchers("/api/employees/**").hasRole("MANAGER") // Chỉ Manager có quyền quản lý nhân viên
                        .requestMatchers("/api/customers/**").hasAnyRole("MANAGER", "EMPLOYEE") // Cả Manager và Employee được xem khách hàng
                        .requestMatchers("/api/managers/**").hasRole("MANAGER")
                        .anyRequest().authenticated() // Các endpoint khác yêu cầu xác thực
                )
                .httpBasic(); // Sử dụng Basic Authentication

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService) // Đăng ký CustomUserDetailsService
                .passwordEncoder(passwordEncoder()) // Đăng ký PasswordEncoder
                .and()
                .build();
    }
}
