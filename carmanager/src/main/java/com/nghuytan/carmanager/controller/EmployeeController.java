package com.nghuytan.carmanager.controller;

import com.nghuytan.carmanager.dto.request.EmployeeRequest;
import com.nghuytan.carmanager.dto.response.EmployeeResponse;
import com.nghuytan.carmanager.model.Employee;
import com.nghuytan.carmanager.model.Manager;
import com.nghuytan.carmanager.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<EmployeeResponse> getAllEmployees() {
        return employeeService.findAllEmployees();
    }

    @PostMapping
    public Employee createEmployee(@RequestBody EmployeeRequest request, Authentication authentication) {
        // Lấy thông tin manager từ Authentication
        String managerUsername = authentication.getName();
        int managerId = employeeService.findManagerIdByUsername(managerUsername);
        return employeeService.createEmployee(request, managerId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Integer id, @RequestBody Employee updatedEmployee, Authentication authentication) {

        if (authentication.getAuthorities().stream()
                .noneMatch(auth -> auth.getAuthority().equals("ROLE_MANAGER"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Employee existingEmployee = employeeService.findById(id);
        if (existingEmployee == null) {
            return ResponseEntity.notFound().build();
        }

        if (updatedEmployee.getPassword() == null || updatedEmployee.getPassword().isEmpty()) {
            updatedEmployee.setPassword(existingEmployee.getPassword());
        }

        if (updatedEmployee.getUsername() == null || updatedEmployee.getUsername().isEmpty()) {
            updatedEmployee.setUsername(existingEmployee.getUsername());
        }

        existingEmployee.setUsername(updatedEmployee.getUsername());
        existingEmployee.setPassword(updatedEmployee.getPassword());
        existingEmployee.setRole(updatedEmployee.getRole());
        existingEmployee.setName(updatedEmployee.getName());
        existingEmployee.setPhoneNumber(updatedEmployee.getPhoneNumber());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setAddress(updatedEmployee.getAddress());
        existingEmployee.setSalary(updatedEmployee.getSalary());
        existingEmployee.setBonusSalary(updatedEmployee.getBonusSalary());
        existingEmployee.setDefaultSalary(updatedEmployee.getDefaultSalary());
        existingEmployee.setCarsSoldTotal(updatedEmployee.getCarsSoldTotal());

        Employee savedManager = employeeService.save(existingEmployee);
        return ResponseEntity.ok(savedManager);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable int id) {
        Employee employee = employeeService.findById(id);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }
        employeeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
