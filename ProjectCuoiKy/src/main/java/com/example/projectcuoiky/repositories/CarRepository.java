package com.example.projectcuoiky.repositories;
import com.example.projectcuoiky.Model.car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CarRepository extends JpaRepository<car, Integer> {
    public List<car> findBySold(Integer sold);
}
