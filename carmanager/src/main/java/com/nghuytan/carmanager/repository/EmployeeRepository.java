package com.nghuytan.carmanager.repository;

import com.nghuytan.carmanager.model.Employee;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Optional<Employee> findByUsername(String username); // Thêm phương thức này

    boolean existsByUsername(@NotBlank(message = "Tên đăng nhập không được để trống") String userName);
}
