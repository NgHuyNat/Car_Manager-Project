package com.nghuytan.carmanager.service;

import com.nghuytan.carmanager.dto.request.EmployeeRequest;
import com.nghuytan.carmanager.dto.response.EmployeeResponse;
import com.nghuytan.carmanager.model.Employee;
import com.nghuytan.carmanager.model.Manager;
import com.nghuytan.carmanager.repository.EmployeeRepository;
import com.nghuytan.carmanager.repository.ManagerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ManagerRepository managerRepository;
    private final PasswordEncoder passwordEncoder;

    public EmployeeService(EmployeeRepository employeeRepository,
                           ManagerRepository managerRepository,
                           PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.managerRepository = managerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Lấy danh sách tất cả nhân viên
    public List<EmployeeResponse> findAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Tạo nhân viên mới
    public Employee createEmployee(EmployeeRequest request, int managerId) {
        Manager manager = managerRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        Employee employee = new Employee();
        employee.setUsername(request.getUserName());
        employee.setPassword(passwordEncoder.encode(request.getPassword()));
        employee.setRole("ROLE_EMPLOYEE");
        employee.setName(request.getName());
        employee.setPhoneNumber(request.getPhoneNumber());
        employee.setEmail(request.getEmail());
        employee.setAddress(request.getAddress());
        employee.setSalary(String.valueOf(request.getSalary()));
        employee.setBonusSalary(String.valueOf(request.getBonusSalary()));
        employee.setDefaultSalary(String.valueOf(request.getDefaultSalary()));
        employee.setCarsSoldTotal(request.getCarsSoldTotal());
        employee.setManager(manager);

        return employeeRepository.save(employee);
    }

    // Ánh xạ Employee sang EmployeeResponse
    public EmployeeResponse mapToResponse(Employee employee) {
        EmployeeResponse response = new EmployeeResponse();
        response.setId(employee.getId());
        response.setName(employee.getName());
        response.setPhoneNumber(employee.getPhoneNumber());
        response.setEmail(employee.getEmail());
        response.setAddress(employee.getAddress());
        response.setBonusSalary(employee.getBonusSalary());
        response.setDefaultSalary(employee.getDefaultSalary());
        response.setCarsSoldTotal(employee.getCarsSoldTotal());
        response.setSalary(employee.getSalary());
        response.setManagerId(employee.getManager() != null ? employee.getManager().getId() : 0);

        return response;
    }

    // Tìm ID của Manager dựa trên username
    public int findManagerIdByUsername(String username) {
        Manager manager = managerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Manager not found with username: " + username));
        return manager.getId();
    }

    public Employee findById(int id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee save(Employee existingEmployee) {
        return employeeRepository.save(existingEmployee);
    }
}
