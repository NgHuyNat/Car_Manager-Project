package com.nghuytan.carmanager.controller;

import com.nghuytan.carmanager.dto.request.RegisterRequest;
import com.nghuytan.carmanager.model.Employee;
import com.nghuytan.carmanager.model.Manager;
import com.nghuytan.carmanager.repository.EmployeeRepository;
import com.nghuytan.carmanager.repository.ManagerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ManagerRepository managerRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(ManagerRepository managerRepository, EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) {
        this.managerRepository = managerRepository;
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Kiểm tra nếu username đã tồn tại trong cả hai bảng
        if (managerRepository.findByUsername(request.getUsername()).isPresent() ||
                employeeRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Tên người dùng đã tồn tại!");
        }

        // Kiểm tra role và tạo Manager hoặc Employee
        if (request.getRole().equalsIgnoreCase("manager")) {
            Manager manager = new Manager();
            manager.setUsername(request.getUsername());
            // Mã hóa mật khẩu trước khi lưu
            manager.setPassword(passwordEncoder.encode(request.getPassword()));
            manager.setRole("ROLE_MANAGER");
            manager.setName(request.getName());
            manager.setPhoneNumber(request.getPhoneNumber());
            manager.setEmail(request.getEmail());
            manager.setAddress(request.getAddress());
            manager.setSalary(request.getSalary());
            manager.setBonusSalary(request.getBonusSalary());
            manager.setDefaultSalary(request.getDefaultSalary());
            managerRepository.save(manager);
        } else if (request.getRole().equalsIgnoreCase("employee")) {
            Employee employee = new Employee();
            employee.setUsername(request.getUsername());
            // Mã hóa mật khẩu trước khi lưu
            employee.setPassword(passwordEncoder.encode(request.getPassword()));
            employee.setRole("ROLE_EMPLOYEE");
            employee.setName(request.getName());
            employee.setPhoneNumber(request.getPhoneNumber());
            employee.setEmail(request.getEmail());
            employee.setAddress(request.getAddress());
            employee.setSalary(request.getSalary());
            employee.setBonusSalary(request.getBonusSalary());
            employee.setDefaultSalary(request.getDefaultSalary());
            employee.setManagerId(request.getManagerId());
            employeeRepository.save(employee);
        } else {
            return ResponseEntity.badRequest().body("Role không hợp lệ!");
        }

        return ResponseEntity.ok("Đăng ký thành công!");
    }
}
