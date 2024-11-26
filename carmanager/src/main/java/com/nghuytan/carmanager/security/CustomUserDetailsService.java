package com.nghuytan.carmanager.security;

import com.nghuytan.carmanager.model.Employee;
import com.nghuytan.carmanager.model.Manager;
import com.nghuytan.carmanager.repository.EmployeeRepository;
import com.nghuytan.carmanager.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final ManagerRepository managerRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public CustomUserDetailsService(ManagerRepository managerRepository,EmployeeRepository employeeRepository) {
        this.managerRepository = managerRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Search "+ username);
        Optional<Manager> managerOptional = managerRepository.findByUsername(username);
        if (managerOptional.isPresent()) {
            System.out.println("Manager found" +  managerOptional.get());
            Manager manager = managerOptional.get();
            return new org.springframework.security.core.userdetails.User(
                    manager.getUsername(),
                    manager.getPassword(),
                    List.of(new SimpleGrantedAuthority(manager.getRole()))
            );
        }

        Optional<Employee> employeeOptional = employeeRepository.findByUsername(username);
        if (employeeOptional.isPresent()) {
            System.out.println("Employee found" +  employeeOptional.get());
            Employee employee = employeeOptional.get();
            return new org.springframework.security.core.userdetails.User(
                    employee.getUsername(),
                    employee.getPassword(),
                    List.of(new SimpleGrantedAuthority(employee.getRole()))
            );
        }

        throw new UsernameNotFoundException("User not found!");
    }

}
