package com.example.projectcuoiky.Controller;

import com.example.projectcuoiky.Model.car;
import com.example.projectcuoiky.Model.electriccar;
import com.example.projectcuoiky.Model.gasolinecar;
import com.example.projectcuoiky.Service.CarService;
import com.example.projectcuoiky.Service.ElectricCarService;
import com.example.projectcuoiky.Service.GasolineCarService;
import com.example.projectcuoiky.repositories.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private CarService carService;

    @Autowired
    private ElectricCarService electricCarService;
    @Autowired
    private GasolineCarService gasolineCarService;
    @Autowired
    private CarRepository carRepository;

    @GetMapping("")
    public List<car> findAll() {
        List<car> cars = carService.findAll();
        if (cars.isEmpty()) {
            throw new NoSuchElementException("No cars found");
        }
        return cars;
    }

    @GetMapping("/soldcar")
    public List<car> getCarBySoldStatus(@RequestParam(value = "sold", defaultValue = "0") int sold) {
        List<car> cars = carService.getCarBySoldStatus(sold);
        if (cars.isEmpty()) {
            throw new NoSuchElementException("No cars found");
        }
        return cars;
    }

    @PostMapping("/addcar")
    public ResponseEntity<car> createElectricCar(@RequestBody Map<String, Object> payload) {
        String enginetype = (String) payload.get("enginetype");
        car car;
        if ("ELECTRIC".equalsIgnoreCase(enginetype)) {
            electriccar electriccar = new electriccar();
            electriccar.setBrand((String) payload.get("brand"));
            electriccar.setName((String) payload.get("name"));
            electriccar.setType((String) payload.get("type"));
            electriccar.setReleaseyear((Integer) payload.get("releaseyear"));
            electriccar.setPrice((String) payload.get("price"));
            electriccar.setImage((String) payload.get("image"));
            electriccar.setSold((Integer) payload.get("sold"));
            electriccar.setBattery_capacity((Integer) payload.get("battery_capacity"));
            electriccar.setRange_per_charge((Integer) payload.get("range_per_charge"));
            car = electricCarService.saveElectricCar(electriccar);
        }
        else if ("GASOLINE".equalsIgnoreCase(enginetype)) {
            gasolinecar gasolinecar = new gasolinecar();
            gasolinecar.setBrand((String) payload.get("brand"));
            gasolinecar.setName((String) payload.get("name"));
            gasolinecar.setType((String) payload.get("type"));
            gasolinecar.setReleaseyear((Integer) payload.get("releaseyear"));
            gasolinecar.setPrice((String) payload.get("price"));
            gasolinecar.setImage((String) payload.get("image"));
            gasolinecar.setSold((Integer) payload.get("sold"));
            gasolinecar.setFuel_tank_capacity((Integer) payload.get("fuel_tank_capacity"));
            gasolinecar.setFuel_efficiency((Integer) payload.get("fuel_efficiency"));
            car = gasolineCarService.saveGasolineCar(gasolinecar);
        }
        else{
            return ResponseEntity.badRequest().body(null);
        }
        carRepository.save(car);
        return ResponseEntity.ok(car);
    }

    @PutMapping("/updatecar/{id}")
    public ResponseEntity<car> updateCar(@PathVariable Integer id, @RequestBody Map<String, Object> payload, Errors errors) {
        try {
            car updatedCar = carService.updateCar(id, payload);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteElectricCar(@PathVariable Integer id) {
        try {
            carService.deleteCarById(id);
            return ResponseEntity.ok("Deleted ElectricCar");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}