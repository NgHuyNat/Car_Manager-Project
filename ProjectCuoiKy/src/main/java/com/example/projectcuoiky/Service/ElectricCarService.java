package com.example.projectcuoiky.Service;

import com.example.projectcuoiky.Model.electriccar;
import org.springframework.stereotype.Service;

@Service
public class ElectricCarService extends CarService {
    public electriccar saveElectricCar(electriccar electriccar) {
        return (electriccar) saveCar(electriccar);
    }
}
