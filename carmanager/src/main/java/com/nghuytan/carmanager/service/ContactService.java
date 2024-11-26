package com.nghuytan.carmanager.service;

import com.nghuytan.carmanager.model.Car;
import com.nghuytan.carmanager.model.Contact;
import com.nghuytan.carmanager.model.Customer;
import com.nghuytan.carmanager.model.Employee;
import com.nghuytan.carmanager.repository.CarRepository;
import com.nghuytan.carmanager.repository.ContactRepository;
import com.nghuytan.carmanager.repository.CustomerRepository;
import com.nghuytan.carmanager.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    private final CarRepository carRepository;

    private final CustomerRepository customerRepository;

    private final EmployeeRepository employeeRepository;

    public ContactService(ContactRepository contactRepository, CarRepository carRepository, CustomerRepository customerRepository, EmployeeRepository employeeRepository) {
        this.contactRepository = contactRepository;
        this.carRepository = carRepository;
        this.customerRepository = customerRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }

    public Contact saveContact(Map<String, Object> payload) {
        Contact contact = new Contact();

        // Lấy thông tin car từ cơ sở dữ liệu
        Integer carid = (Integer) payload.get("carid");
        Car car = carRepository.findById(carid)
                .orElseThrow(() -> new EntityNotFoundException("Car not found with ID: " + carid));

        // Lấy thông tin customer từ cơ sở dữ liệu
        Integer customerid = (Integer) payload.get("customerid");
        Customer customer = customerRepository.findById(customerid)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with ID: " + customerid));

        // Lấy thông tin employee từ cơ sở dữ liệu
        Integer employeeid = (Integer) payload.get("employeeid");
        Employee employee = employeeRepository.findById(employeeid)
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

    public Contact updateContact(Integer id, Map<String, Object> payload) {
        Contact existingContact = contactRepository.findById(id)
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