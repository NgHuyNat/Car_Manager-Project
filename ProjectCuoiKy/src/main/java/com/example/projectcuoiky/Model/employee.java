package com.example.projectcuoiky.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee")
@Entity
@Data

public class employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
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
    private Integer carsoldtotal;
    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private manager manager_id;
}