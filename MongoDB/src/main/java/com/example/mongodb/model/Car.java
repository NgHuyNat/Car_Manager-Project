package com.example.mongodb.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
@Getter
@Setter

public class Car {
    @Id
    private Integer id;
    private String image;
    private String name;
    private String type;
    private String brand;
    private String color;
    private String engine;
    private String information;
}