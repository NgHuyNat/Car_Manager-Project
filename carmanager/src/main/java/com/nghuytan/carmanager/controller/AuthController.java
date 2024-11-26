package com.nghuytan.carmanager.controller;

import com.nghuytan.carmanager.dto.request.LoginRequest;
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
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final ManagerRepository managerRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(ManagerRepository managerRepository, EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) {
        this.managerRepository = managerRepository;
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (managerRepository.findByUsername(request.getUsername()).isPresent() ||
                employeeRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Tên người dùng đã tồn tại!");
        }

        if (request.getRole().equalsIgnoreCase("manager")) {
            Manager manager = new Manager();
            manager.setUsername(request.getUsername());
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

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        var managerOpt = managerRepository.findByUsername(loginRequest.getUsername());
        if (managerOpt.isPresent()) {
            Manager manager = managerOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), manager.getPassword())) {
                return ResponseEntity.ok("Đăng nhập thành công với vai trò Quản lý!");
            }
        }

        var employeeOpt = employeeRepository.findByUsername(loginRequest.getUsername());
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), employee.getPassword())) {
                return ResponseEntity.ok("Đăng nhập thành công với vai trò Nhân viên!");
            }
        }

        return ResponseEntity.badRequest().body("Tên người dùng hoặc mật khẩu không đúng!");
    }

}
