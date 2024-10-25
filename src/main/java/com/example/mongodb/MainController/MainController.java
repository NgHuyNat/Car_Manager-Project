package com.example.mongodb.MainController;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.mongodb.Repositories.CarRepository;
import com.example.mongodb.Repositories.StudentRepository;
import com.example.mongodb.model.Car;
import com.example.mongodb.model.ElectricCar;

import com.example.mongodb.model.ElectricCar;
import com.example.mongodb.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

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

    @GetMapping("/ElectricCar")
    public List<ElectricCar> getElectricCars() {
        return carRepository.findBykmpercharge();
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

    @GetMapping("/Car/Brand")
    public List<Car> getCarBrand(@RequestParam String brand) {
        return carRepository.findByBrand(brand);
    }

    @GetMapping("/Car/{id}")
    public Car getCarById(@PathVariable Integer id) {
        return carRepository.findById(id).orElse(null);
    }



}
