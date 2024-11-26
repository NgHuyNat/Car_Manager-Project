package com.nghuytan.carmanager.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterRequest {
    private String username;
    private String password;
    private String role;
    private String name;
    private String phoneNumber;
    private String email;
    private String address;
    private String salary;
    private String bonusSalary;
    private String defaultSalary;
    private int managerId;

}
