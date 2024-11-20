package com.nghuytan.carmanager.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EmployeeRequest {

    @JsonProperty("username")
    @NotBlank(message = "Tên đăng nhập không được để trống")
    private String userName;

    @JsonProperty("password")
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;

    @NotBlank(message = "Không bỏ chức vụ")
    private String role;

    @NotBlank(message = "Tên không được để trống")
    private String name;

    private String phoneNumber;

    private String email;

    private String address;

    @NotNull(message = "Lương không được để trống")
    private String salary;

    private String bonusSalary;

    private String defaultSalary;

    private int carsSoldTotal;

    @NotNull(message = "Manager ID không được để trống")
    private Integer managerId;

    // Getters và Setters
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

    public String getSalary() {
        return salary;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getBonusSalary() {
        return bonusSalary;
    }

    public void setBonusSalary(String bonusSalary) {
        this.bonusSalary = bonusSalary;
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

    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
