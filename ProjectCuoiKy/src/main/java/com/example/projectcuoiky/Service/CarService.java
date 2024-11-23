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
        car existingCar = carRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy xe với ID: " + id));
        String enginetype = (String) payload.get("enginetype");

        if (enginetype == null) {
            throw new IllegalArgumentException("Loại động cơ (enginetype) là bắt buộc");
        }

        if ("ELECTRIC".equalsIgnoreCase(enginetype) && existingCar instanceof electriccar) {
            electriccar electricCar = (electriccar) existingCar;
            electricCar.setBrand((String) payload.getOrDefault("brand", electricCar.getBrand()));
            electricCar.setName((String) payload.getOrDefault("name", electricCar.getName()));
            electricCar.setType((String) payload.getOrDefault("type", electricCar.getType()));
            electricCar.setReleaseyear(parseInteger(payload.get("releaseyear"), electricCar.getReleaseyear()));
            electricCar.setPrice((String) payload.getOrDefault("price", electricCar.getPrice()));
            electricCar.setImage((String) payload.getOrDefault("image", electricCar.getImage()));
            electricCar.setSold(parseInteger(payload.get("sold"), electricCar.getSold()));
            electricCar.setBattery_capacity(parseInteger(payload.get("battery_capacity"), electricCar.getBattery_capacity()));
            electricCar.setRange_per_charge(parseInteger(payload.get("range_per_charge"), electricCar.getRange_per_charge()));
            return carRepository.save(electricCar);
        } else if ("GASOLINE".equalsIgnoreCase(enginetype) && existingCar instanceof gasolinecar) {
            gasolinecar gasolineCar = (gasolinecar) existingCar;
            gasolineCar.setBrand((String) payload.getOrDefault("brand", gasolineCar.getBrand()));
            gasolineCar.setName((String) payload.getOrDefault("name", gasolineCar.getName()));
            gasolineCar.setType((String) payload.getOrDefault("type", gasolineCar.getType()));
            gasolineCar.setReleaseyear(parseInteger(payload.get("releaseyear"), gasolineCar.getReleaseyear()));
            gasolineCar.setPrice((String) payload.getOrDefault("price", gasolineCar.getPrice()));
            gasolineCar.setSold(parseInteger(payload.get("sold"), gasolineCar.getSold()));
            gasolineCar.setImage((String) payload.getOrDefault("image", gasolineCar.getImage()));
            gasolineCar.setFuel_tank_capacity(parseInteger(payload.get("fuel_tank_capacity"), gasolineCar.getFuel_tank_capacity()));
            gasolineCar.setFuel_efficiency(parseInteger(payload.get("fuel_efficiency"), gasolineCar.getFuel_efficiency()));
            return carRepository.save(gasolineCar);
        } else {
            throw new IllegalArgumentException("Loại động cơ không hợp lệ hoặc không khớp với kiểu xe");
        }
    }

    private Integer parseInteger(Object value, Integer defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        try {
            return Integer.parseInt(value.toString());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Giá trị không hợp lệ cho số nguyên: " + value, e);
        }
    }


    public void deleteCarById(Integer id){
        carRepository.deleteById(id);
    }
}