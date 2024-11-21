package com.example.projectcuoiky.Service;

import com.example.projectcuoiky.Model.car;
import com.example.projectcuoiky.Model.contact;
import com.example.projectcuoiky.Model.customer;
import com.example.projectcuoiky.Model.employee;
import com.example.projectcuoiky.repositories.CarRepository;
import com.example.projectcuoiky.repositories.ContactRepository;
import com.example.projectcuoiky.repositories.CustomerRepository;
import com.example.projectcuoiky.repositories.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<contact> findAll() {
        return contactRepository.findAll();
    }

    public contact saveContact(Map<String, Object> payload) {
        contact contact = new contact();

        // Lấy thông tin car từ cơ sở dữ liệu
        Integer carid = (Integer) payload.get("carid");
        car car = carRepository.findById(carid)
                .orElseThrow(() -> new EntityNotFoundException("Car not found with ID: " + carid));

        // Lấy thông tin customer từ cơ sở dữ liệu
        Integer customerid = (Integer) payload.get("customerid");
        customer customer = customerRepository.findById(customerid)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with ID: " + customerid));

        // Lấy thông tin employee từ cơ sở dữ liệu
        Integer employeeid = (Integer) payload.get("employeeid");
        employee employee = employeeRepository.findById(employeeid)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with ID: " + employeeid));

        // Gán các thông tin vào contact
        contact.setCar(car);
        contact.setCustomer(customer);
        contact.setEmployee(employee);

        // Lấy detail và date từ payload
        String detail = (String) payload.get("detail");
        if (detail == null || detail.isEmpty()) {
            throw new IllegalArgumentException("Detail is required");
        }
        contact.setDetail(detail);

        String dateString = (String) payload.get("date");
        if (dateString == null || dateString.isEmpty()) {
            throw new IllegalArgumentException("Date is required");
        }
        try {
            Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dateString);
            contact.setDate(date);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format. Expected yyyy-MM-dd");
        }

        // Lưu contact vào cơ sở dữ liệu
        return contactRepository.save(contact);
    }

    public contact updateContact(Integer id, Map<String, Object> payload) {
        contact existingContact = contactRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact not found with ID: " + id));

        String detail = (String) payload.get("detail");
        if (detail == null || detail.isEmpty()) {
            throw new IllegalArgumentException("Detail is required");
        }
        existingContact.setDetail(detail);

        String dateString = (String) payload.get("date");
        if (dateString == null || dateString.isEmpty()) {
            throw new IllegalArgumentException("Date is required");
        }
        try {
            Date date = new SimpleDateFormat("yyyy-MM-đd").parse(dateString);
            existingContact.setDate(date);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format. Expected yyyy-MM-dd");
        }

        return contactRepository.save(existingContact);
    }

    public void deleteContact(Integer id) {
        contactRepository.deleteById(id);
    }
}