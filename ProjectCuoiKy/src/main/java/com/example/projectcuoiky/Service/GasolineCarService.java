package com.example.projectcuoiky.Service;

import com.example.projectcuoiky.Model.gasolinecar;
import org.springframework.stereotype.Service;

@Service
public class GasolineCarService extends CarService {
    public gasolinecar saveGasolineCar(gasolinecar gasolineCar) {
        return (gasolinecar) saveCar(gasolineCar);
    }
}