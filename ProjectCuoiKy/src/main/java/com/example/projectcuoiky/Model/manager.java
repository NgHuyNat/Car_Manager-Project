package com.example.projectcuoiky.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "manager")
@Entity

public class manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String role;
    private String username;
    private String password;
    private String phonenumber;
    private String email;
    private String address;
    private String salary;
    private String bonussalary;
    private String defaultsalary;
}