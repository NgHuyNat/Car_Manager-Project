package com.example.projectcuoiky.Service;

import com.example.projectcuoiky.Model.car;
import com.example.projectcuoiky.Model.customer;
import com.example.projectcuoiky.repositories.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public List<customer> findAll(){
        return customerRepository.findAll();
    }

    public customer saveCustomer(Map<String, Object> payload) {
        customer newCustomer = new customer();

        newCustomer.setName((String) payload.get("name"));
        newCustomer.setEmail((String) payload.get("email"));
        newCustomer.setAddress((String) payload.get("address"));
        newCustomer.setPhonenumber((String) payload.get("phonenumber"));

        return customerRepository.save(newCustomer);
    }

    public customer updateCustomer(Integer id, Map<String, Object> payload) {
        customer existingCustomer = customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Customer not found with id" + id));

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

