package com.nghuytan.carmanager.controller;

import com.nghuytan.carmanager.dto.request.EmployeeRequest;
import com.nghuytan.carmanager.dto.response.EmployeeResponse;
import com.nghuytan.carmanager.model.Employee;
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
    public EmployeeResponse createEmployee(@RequestBody EmployeeRequest request, Authentication authentication) {
        String managerUsername = authentication.getName();
        int managerId = employeeService.findManagerIdByUsername(managerUsername);
        Employee employee = employeeService.createEmployee(request, managerId);
        return employeeService.mapToResponse(employee);
    }


    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable Integer id,
            @RequestBody EmployeeRequest request,
            Authentication authentication) {

        if (authentication.getAuthorities().stream()
                .noneMatch(auth -> auth.getAuthority().equals("ROLE_MANAGER"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // Gọi service để cập nhật nhân viên
        Employee updatedEmployee;
        try {
            updatedEmployee = employeeService.updateEmployee(id, request);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Trả về phản hồi
        EmployeeResponse response = employeeService.mapToResponse(updatedEmployee);
        return ResponseEntity.ok(response);
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