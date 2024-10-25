package com.example.mongodb.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
@Getter
@Setter

public class GasolineCar extends Car {
    private Long Lper100Km;
    private String ElectricEngine;
}
