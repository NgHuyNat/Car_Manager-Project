package com.example.projectcuoiky.repositories;

import com.example.projectcuoiky.Model.customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<customer, Integer> {

}
