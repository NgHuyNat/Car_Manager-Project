package com.nghuytan.carmanager.service;

import com.nghuytan.carmanager.model.Customer;
import com.nghuytan.carmanager.repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> findAll(){
        return customerRepository.findAll();
    }

    public Customer saveCustomer(Map<String, Object> payload) {
        Customer newCustomer = new Customer();

        newCustomer.setName((String) payload.get("name"));
        newCustomer.setEmail((String) payload.get("email"));
        newCustomer.setAddress((String) payload.get("address"));
        newCustomer.setPhonenumber((String) payload.get("phonenumber"));

        return customerRepository.save(newCustomer);
    }

    public Customer updateCustomer(Integer id, Map<String, Object> payload) {
        Customer existingCustomer = customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Customer not found with id" + id));

        existingCustomer.setName((String) payload.get("name"));
        existingCustomer.setEmail((String) payload.get("email"));
        existingCustomer.setAddress((String) payload.get("address"));
        existingCustomer.setPhonenumber((String) payload.get("phonenumber"));
        return customerRepository.save(existingCustomer);
    }

    public void deleteCustomer(Integer id) {
        customerRepository.deleteById(id);
    }
}

