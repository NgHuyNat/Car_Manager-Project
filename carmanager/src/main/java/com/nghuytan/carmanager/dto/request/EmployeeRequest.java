package com.nghuytan.carmanager.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
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


}
