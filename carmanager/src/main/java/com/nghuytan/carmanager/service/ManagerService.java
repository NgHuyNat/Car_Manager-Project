package com.nghuytan.carmanager.service;


import com.nghuytan.carmanager.model.Manager;
import com.nghuytan.carmanager.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService  {
    @Autowired
    private ManagerRepository managerRepository;

    public List<Manager> findAll() {
        return managerRepository.findAll();
    }

    public Manager findById(int id) {
        return managerRepository.findById(id).orElse(null);
    }

    public Manager save(Manager manager) {
        return managerRepository.save(manager);
    }

    public void deleteById(int id) {
        managerRepository.deleteById(id);
    }
}

