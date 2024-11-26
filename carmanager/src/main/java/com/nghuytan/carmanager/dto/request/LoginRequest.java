package com.nghuytan.carmanager.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest {
    @NotBlank(message = "Tên người dùng không được để trống!")
    private String username;

    @NotBlank(message = "Mật khẩu không được để trống!")
    private String password;

}
