package com.example.projectcuoiky.Model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DiscriminatorValue("GASOLINE")
@Data
public class gasolinecar extends car{
    private int fuel_tank_capacity;
    private int fuel_efficiency;
}
