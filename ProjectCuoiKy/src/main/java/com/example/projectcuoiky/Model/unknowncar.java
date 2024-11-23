package com.example.projectcuoiky.Model;

import com.example.projectcuoiky.Model.car;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("UNKNOWN")
public class unknowncar extends car {

}
