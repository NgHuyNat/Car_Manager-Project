package com.example.mongodb.Repositories;

import com.example.mongodb.model.Car;
import com.example.mongodb.model.ElectricCar;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CarRepository extends MongoRepository<Car, Integer> {
    List<Car> findByBrand(String brand);
    List<ElectricCar> findBykmpercharge(String kmpercharge);
}
