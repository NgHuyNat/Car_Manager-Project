package com.nghuytan.carmanager.controller;

import com.nghuytan.carmanager.dto.request.EmployeeRequest;
import com.nghuytan.carmanager.dto.response.EmployeeResponse;
import com.nghuytan.carmanager.model.Employee;
import com.nghuytan.carmanager.service.EmployeeService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

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
}
