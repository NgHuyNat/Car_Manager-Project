package com.nghuytan.carmanager.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class    EmployeeResponse {

    private int id;
    private String name;
    private String phoneNumber;
    private String email;
    private String address;
    private String salary;
    private String bonusSalary;
    private String defaultSalary;
    private int carsSoldTotal;
    private int managerId;

}

