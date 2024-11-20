package com.nghuytan.carmanager.dto.response;

public class EmployeeResponse {

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBonusSalary() {
        return bonusSalary;
    }

    public void setBonusSalary(String bonusSalary) {
        this.bonusSalary = bonusSalary;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getDefaultSalary() {
        return defaultSalary;
    }

    public void setDefaultSalary(String defaultSalary) {
        this.defaultSalary = defaultSalary;
    }

    public int getCarsSoldTotal() {
        return carsSoldTotal;
    }

    public void setCarsSoldTotal(int carsSoldTotal) {
        this.carsSoldTotal = carsSoldTotal;
    }

    public int getManagerId() {
        return managerId;
    }

    public void setManagerId(int managerId) {
        this.managerId = managerId;
    }
}

