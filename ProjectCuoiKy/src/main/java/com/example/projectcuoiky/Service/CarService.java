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
import java.util.Optional;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    public List<car> findAll(){
        return carRepository.findAll();
    }

    public List<car> getCarBySoldStatus(int sold){
        return carRepository.findBySold(sold);
    }

    public String updateCarSoldStatus(Integer id){
        Optional<car> carOptional = carRepository.findById(id);
        if(carOptional.isPresent()){
            car car = carOptional.get();
            car.setSold(1);
            carRepository.save(car);
            return "car with ID" + id + "have been sold";
        }
        return "car with ID" + id + " not found";
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
            electricCar.setImage((String) payload.get("image"));
            electricCar.setSold((Integer) payload.get("sold"));
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
            gasolineCar.setSold((Integer) payload.get("sold"));
            gasolineCar.setImage((String) payload.get("image"));
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