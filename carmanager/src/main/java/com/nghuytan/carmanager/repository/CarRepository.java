package com.nghuytan.carmanager.repository;

import com.nghuytan.carmanager.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    public List<Car> findBySold(Integer sold);
}
