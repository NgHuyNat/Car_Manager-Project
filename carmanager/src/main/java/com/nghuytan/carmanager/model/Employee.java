package com.nghuytan.carmanager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phonenumber")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "salary")
    private String salary;

    @Column(name = "bonussalary")
    private String bonusSalary;

    @Column(name = "defaultsalary")
    private String defaultSalary;

    @Column(name = "carssoldtotal")
    private int carsSoldTotal;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "manager_id")
    private Manager manager;

    public Integer getManagerId() {
        return manager != null ? manager.getId() : null; // Trả về ID từ Manager
    }

    public void setManagerId(int managerId) {
    }
}
