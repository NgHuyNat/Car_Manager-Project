package com.example.projectcuoiky.repositories;

import com.example.projectcuoiky.Model.employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<employee, Integer> {
}
