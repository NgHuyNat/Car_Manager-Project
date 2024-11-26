package com.nghuytan.carmanager.service;

import com.nghuytan.carmanager.model.Electriccar;
import org.springframework.stereotype.Service;

@Service
public class ElectricCarService extends CarService {
    public Electriccar saveElectricCar(Electriccar electriccar) {
        return (Electriccar) saveCar(electriccar);
    }
}
