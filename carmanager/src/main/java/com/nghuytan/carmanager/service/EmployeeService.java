package com.nghuytan.carmanager.service;

import com.nghuytan.carmanager.dto.request.EmployeeRequest;
import com.nghuytan.carmanager.dto.response.EmployeeResponse;
import com.nghuytan.carmanager.model.Customer;
import com.nghuytan.carmanager.model.Employee;
import com.nghuytan.carmanager.model.Manager;
import com.nghuytan.carmanager.repository.EmployeeRepository;
import com.nghuytan.carmanager.repository.ManagerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.nghuytan.carmanager.exception.CustomException;

import java.util.List;
import java.util.Map;
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

    public List<EmployeeResponse> findAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Employee createEmployee(EmployeeRequest request, int managerId) {
        Manager manager = managerRepository.findById(managerId)
                .orElseThrow(() -> new CustomException("Manager không tìm thấy với ID: " + managerId, 404));

        if (employeeRepository.existsByUsername(request.getUserName())) {
            throw new CustomException("Tên đăng nhập '" + request.getUserName() + "' đã tồn tại.", 400);
        }

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

    public int findManagerIdByUsername(String username) {
        Manager manager = managerRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException("Không tìm thấy quản lý với tên đăng nhập: " + username, 404));
        return manager.getId();
    }


    public Employee findById(int id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new CustomException("Không tìm thấy nhân viên với ID: " + id, 404));
    }


    public void deleteById(int id) {
        employeeRepository.deleteById(id);
    }

    public Employee updateEmployee(int id, EmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new CustomException("Không tìm thấy nhân viên với ID: " + id, 404));


        if (request.getUserName() != null &&
                employeeRepository.existsByUsername(request.getUserName()) &&
                !employee.getUsername().equals(request.getUserName())) {
            throw new CustomException("Tên đăng nhập '" + request.getUserName() + "' đã tồn tại.", 400);
        }

        if (request.getUserName() != null) employee.setUsername(request.getUserName());
        if (request.getPassword() != null) employee.setPassword(passwordEncoder.encode(request.getPassword()));
        if (request.getRole() != null) employee.setRole(request.getRole());
        if (request.getName() != null) employee.setName(request.getName());
        if (request.getPhoneNumber() != null) employee.setPhoneNumber(request.getPhoneNumber());
        if (request.getEmail() != null) employee.setEmail(request.getEmail());
        if (request.getAddress() != null) employee.setAddress(request.getAddress());
        if (request.getSalary() != null) employee.setSalary(request.getSalary());
        if (request.getBonusSalary() != null) employee.setBonusSalary(request.getBonusSalary());
        if (request.getDefaultSalary() != null) employee.setDefaultSalary(request.getDefaultSalary());
        employee.setCarsSoldTotal(request.getCarsSoldTotal());

        return employeeRepository.save(employee);
    }


}
