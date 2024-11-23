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
        try {
            String enginetype = (String) payload.get("enginetype");
            car car;

            if ("ELECTRIC".equalsIgnoreCase(enginetype)) {
                electriccar electricCar = new electriccar();
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
                gasolinecar gasolineCar = new gasolinecar();
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