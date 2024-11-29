package com.nghuytan.carmanager.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {
    private String message;
    private EmployeeResponse employee;

    public LoginResponse(String message, EmployeeResponse employee) {
        this.message = message;
        this.employee = employee;
    }

}
