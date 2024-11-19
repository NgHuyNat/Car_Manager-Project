package com.example.projectcuoiky.Service;

import com.example.projectcuoiky.Model.car;
import com.example.projectcuoiky.Model.electriccar;
import com.example.projectcuoiky.Model.gasolinecar;
import com.example.projectcuoiky.repositories.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    public List<car> findAll(){
        return carRepository.findAll();
    }


    public car saveCar(car car){
        return carRepository.save(car);
    }

    public car updateCar(Integer id, Map<String, Object> payload) {
        car existingCar = carRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Car not found with ID: " + id));
        String enginetype = (String) payload.get("enginetype");

        if ("ELECTRIC".equalsIgnoreCase(enginetype) && existingCar instanceof electriccar) {
            electriccar electricCar = (electriccar) existingCar;
            electricCar.setBrand((String) payload.get("brand"));
            electricCar.setName((String) payload.get("name"));
            electricCar.setType((String) payload.get("type"));
            electricCar.setReleaseyear((Integer) payload.get("releaseyear"));
            electricCar.setPrice((String) payload.get("price"));
            electricCar.setBattery_capacity((Integer) payload.get("battery_capacity"));
            electricCar.setRange_per_charge((Integer) payload.get("range_per_charge"));
            return carRepository.save(electricCar);
        } else if ("GASOLINE".equalsIgnoreCase(enginetype) && existingCar instanceof gasolinecar) {
            gasolinecar gasolineCar = (gasolinecar) existingCar;
            gasolineCar.setBrand((String) payload.get("brand"));
            gasolineCar.setName((String) payload.get("name"));
            gasolineCar.setType((String) payload.get("type"));
            gasolineCar.setReleaseyear((Integer) payload.get("releaseyear"));
            gasolineCar.setPrice((String) payload.get("price"));
            gasolineCar.setFuel_tank_capacity((Integer) payload.get("fuel_tank_capacity"));
            gasolineCar.setFuel_efficiency((Integer) payload.get("fuel_efficiency"));
            return carRepository.save(gasolineCar);
        } else {
            throw new IllegalArgumentException("Invalid engine type or car type mismatch");
        }
    }

    public void deleteCarById(Integer id){
        carRepository.deleteById(id);
    }
}