package com.example.mongodb.MainController;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.mongodb.Repositories.CarRepository;
import com.example.mongodb.Repositories.StudentRepository;
import com.example.mongodb.model.*;

import com.example.mongodb.model.ElectricCar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api")
public class MainController {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CarRepository carRepository;

    @GetMapping("/Student")
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("Student/{id}")
    public Student getStudentById(@PathVariable Integer id) {
        return studentRepository.findById(id).orElse(null);
    }

    @PostMapping("Student/addStudents")
    public void addStudent(@RequestBody Student student) {
        studentRepository.save(student);
    }

    @PostMapping("Student/addListOfStudents")
    public void addListOfStudents(@RequestBody List<Student> students) {
        studentRepository.saveAll(students);
    }

    @PutMapping("Student/{id}")
    public void updateStudent(@PathVariable Integer id, @RequestBody Student student) {
        Student oldStudent = studentRepository.findById(id).orElse(null);
        if (oldStudent != null) {
            oldStudent.setName(student.getName());
            oldStudent.setAddress(student.getAddress());
            studentRepository.save(oldStudent);
        }
    }

    @DeleteMapping("Student/{id}")
    public void deleteStudent(@PathVariable Integer id) {
        studentRepository.deleteById(id);
    }


    @GetMapping("/Car")
    public List<Car> getCars() {
        return carRepository.findAll();
    }

    @GetMapping("/Car/getElectricCar")
    public List<ElectricCar> getAllElectricCars() {
        return carRepository.findAll().stream()
                .filter(car -> car instanceof ElectricCar)
                .map(car -> (ElectricCar) car)
                .collect(Collectors.toList());
    }

    @GetMapping("/Car/getGasolineCar")
    public List<GasolineCar> getAllGasolineCars() {
        return carRepository.findAll().stream()
                .filter(car -> car instanceof GasolineCar)
                .map(car -> (GasolineCar) car)
                .collect(Collectors.toList());
    }

    @GetMapping("/Car/getBrandCar")
    public List<Car> getCarBrand(@RequestParam String brand) {
        return carRepository.findByBrand(brand);
    }

    @GetMapping("/Car/{id}")
    public Car getCarById(@PathVariable Integer id) {
        return carRepository.findById(id).orElse(null);
    }

    @PostMapping("/Car/addCar")
    public void insertCar(@RequestBody Car car) {
        System.out.println(car);
        carRepository.save(car);
    }

    @PostMapping("/Car/addElectricCar")
    public void addElectricCar(@RequestBody ElectricCar electricCar) {
        carRepository.save(electricCar);
    }

    @PostMapping("/Car/addGasolineCar")
    public void addGasolineCar(@RequestBody GasolineCar gasolineCar) {
        carRepository.save(gasolineCar);
        System.out.println(gasolineCar);
    }

    @PutMapping("/Car/{id}")
    public void updateCar(@PathVariable Integer id, @RequestBody Car car) {
        Car oldCar = carRepository.findById(id).orElse(null);
        if (oldCar != null) {
            oldCar.setId(car.getId());
            oldCar.setImage(oldCar.getImage());
            oldCar.setName(car.getName());
            oldCar.setType(car.getType());
            oldCar.setBrand(car.getBrand());
            oldCar.setColor(car.getColor());
            oldCar.setEngine(car.getEngine());
            oldCar.setInformation(car.getInformation());
            carRepository.save(oldCar);
        }
    }

    @DeleteMapping("/Car/{id}")
    public void deleteCar(@PathVariable Integer id) {
        carRepository.deleteById(id);
    }
}
