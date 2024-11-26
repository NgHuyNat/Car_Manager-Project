package com.nghuytan.carmanager.controller;

import com.nghuytan.carmanager.model.Manager;
import com.nghuytan.carmanager.service.ManagerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/managers")
public class ManagerController {

    private final ManagerService managerService;

    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @GetMapping
    public ResponseEntity<List<Manager>> getAllManagers() {
        List<Manager> managers = managerService.findAll();
        return ResponseEntity.ok(managers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable int id) {
        Manager manager = managerService.findById(id);
        if (manager == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(manager);
    }

    @PostMapping
    public ResponseEntity<Manager> createManager(@RequestBody Manager manager) {
        Manager createdManager = managerService.save(manager);
        return ResponseEntity.ok(createdManager);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manager> updateManager(@PathVariable int id, @RequestBody Manager updatedManager) {
        // Kiểm tra xem Manager có tồn tại không
        Manager existingManager = managerService.findById(id);
        if (existingManager == null) {
            return ResponseEntity.notFound().build();
        }

        existingManager.setUsername(updatedManager.getUsername());
        existingManager.setPassword(updatedManager.getPassword());
        existingManager.setRole(updatedManager.getRole());
        existingManager.setName(updatedManager.getName());
        existingManager.setPhoneNumber(updatedManager.getPhoneNumber());
        existingManager.setEmail(updatedManager.getEmail());
        existingManager.setAddress(updatedManager.getAddress());
        existingManager.setSalary(updatedManager.getSalary());
        existingManager.setBonusSalary(updatedManager.getBonusSalary());
        existingManager.setDefaultSalary(updatedManager.getDefaultSalary());

        Manager savedManager = managerService.save(existingManager);
        return ResponseEntity.ok(savedManager);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManager(@PathVariable int id) {
        Manager manager = managerService.findById(id);
        if (manager == null) {
            return ResponseEntity.notFound().build();
        }
        managerService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
