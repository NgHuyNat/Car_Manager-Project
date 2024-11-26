package com.nghuytan.carmanager.controller;

import com.nghuytan.carmanager.model.Car;
import com.nghuytan.carmanager.model.Electriccar;
import com.nghuytan.carmanager.model.Gasolinecar;
import com.nghuytan.carmanager.service.CarService;
import com.nghuytan.carmanager.service.ElectricCarService;
import com.nghuytan.carmanager.service.GasolineCarService;
import com.nghuytan.carmanager.repository.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/car")
public class CarController {

    private final CarService carService;

    private final ElectricCarService electricCarService;
    private final GasolineCarService gasolineCarService;
    private final CarRepository carRepository;

    public CarController(CarService carService, ElectricCarService electricCarService, GasolineCarService gasolineCarService, CarRepository carRepository) {
        this.carService = carService;
        this.electricCarService = electricCarService;
        this.gasolineCarService = gasolineCarService;
        this.carRepository = carRepository;
    }

    @GetMapping("")
    public List<Car> findAll() {
        List<Car> cars = carService.findAll();
        if (cars.isEmpty()) {
            throw new NoSuchElementException("No cars found");
        }
        return cars;
    }

    @GetMapping("/soldcar")
    public List<Car> getCarBySoldStatus(@RequestParam(value = "sold", defaultValue = "0") int sold) {
        List<Car> cars = carService.getCarBySoldStatus(sold);
        if (cars.isEmpty()) {
            throw new NoSuchElementException("No cars found");
        }
        return cars;
    }

    @PostMapping("/addcar")
    public ResponseEntity<Car> createElectricCar(@RequestBody Map<String, Object> payload) {
        try {
            String enginetype = (String) payload.get("enginetype");
            Car car;

            if ("ELECTRIC".equalsIgnoreCase(enginetype)) {
                Electriccar electricCar = new Electriccar();
                electricCar.setBrand((String) payload.get("brand"));
                electricCar.setName((String) payload.get("name"));
                electricCar.setType((String) payload.get("type"));
                electricCar.setReleaseyear(parseInteger(payload.get("releaseyear")));
                electricCar.setPrice((String) payload.get("price"));
                electricCar.setImage((String) payload.get("image"));
                electricCar.setSold(parseInteger(payload.get("sold")));
                electricCar.setBattery_capacity(parseInteger(payload.get("battery_capacity")));
                electricCar.setRange_per_charge(parseInteger(payload.get("range_per_charge")));
                car = electricCarService.saveElectricCar(electricCar);
            } else if ("GASOLINE".equalsIgnoreCase(enginetype)) {
                Gasolinecar gasolineCar = new Gasolinecar();
                gasolineCar.setBrand((String) payload.get("brand"));
                gasolineCar.setName((String) payload.get("name"));
                gasolineCar.setType((String) payload.get("type"));
                gasolineCar.setReleaseyear(parseInteger(payload.get("releaseyear")));
                gasolineCar.setPrice((String) payload.get("price"));
                gasolineCar.setImage((String) payload.get("image"));
                gasolineCar.setSold(parseInteger(payload.get("sold")));
                gasolineCar.setFuel_tank_capacity(parseInteger(payload.get("fuel_tank_capacity")));
                gasolineCar.setFuel_efficiency(parseInteger(payload.get("fuel_efficiency")));
                car = gasolineCarService.saveGasolineCar(gasolineCar);
            } else {
                return ResponseEntity.badRequest().body(null);
            }

            carRepository.save(car);
            return ResponseEntity.ok(car);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    private Integer parseInteger(Object value) {
        if (value == null) {
            return 0; // Giá trị mặc định nếu trường không tồn tại
        }
        try {
            return Integer.parseInt(value.toString());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid number format for value: " + value);
        }
    }

    @PutMapping("/updatecar/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Integer id, @RequestBody Map<String, Object> payload, Errors errors) {
        try {
            Car updatedCar = carService.updateCar(id, payload);
            return ResponseEntity.ok(updatedCar);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/updatesoldcar/{id}")
    public ResponseEntity<?> updateCarSoldStatus(@PathVariable Integer id) {
        try {
            String message = carService.updateCarSoldStatus(id);
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/deletecar/{id}")
    public ResponseEntity<String> deleteElectricCar(@PathVariable Integer id) {
        try {
            carService.deleteCarById(id);
            return ResponseEntity.ok("Deleted ElectricCar");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}