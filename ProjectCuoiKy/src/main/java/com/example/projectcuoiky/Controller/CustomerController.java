package com.example.projectcuoiky.Controller;

import com.example.projectcuoiky.Model.customer;
import com.example.projectcuoiky.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("")
    public List<customer> findAll(){
        return customerService.findAll();
    }

    @PostMapping("/addcustomer")
    public ResponseEntity<customer> addCustomer(@RequestBody Map<String, Object> payload){
        try {
            customer savedCustomer = customerService.saveCustomer(payload);
            return ResponseEntity.ok(savedCustomer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/updatecustomer/{id}")
    public ResponseEntity<customer> updateCustomer(@RequestBody Map<String, Object> payload, @PathVariable int id){
        try {
            customer updatedCustomer = customerService.updateCustomer(id, payload);
            return ResponseEntity.ok(updatedCustomer);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/deletecustomer/{id}")
    public ResponseEntity<customer> deleteCustomer(@PathVariable int id){
        customerService.deleteCustomer(id);
        return ResponseEntity.ok(null);
    }
}