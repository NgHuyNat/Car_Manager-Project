package com.nghuytan.carmanager.service;

import com.nghuytan.carmanager.model.Gasolinecar;
import org.springframework.stereotype.Service;

@Service
public class GasolineCarService extends CarService {
    public Gasolinecar saveGasolineCar(Gasolinecar gasolineCar) {
        return (Gasolinecar) saveCar(gasolineCar);
    }
}