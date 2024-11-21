package com.example.projectcuoiky.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "contact")
@Entity

public class contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "carid", nullable = false)
    private car car;

    @ManyToOne
    @JoinColumn(name = "employeeid", nullable = false)
    private employee employee;

    @ManyToOne
    @JoinColumn(name = "customerid", nullable = false)
    private customer customer;

    @Column(name = "detail", nullable = false, length = 500)
    private String detail;

    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;
}