package com.example.projectcuoiky.repositories;

import com.example.projectcuoiky.Model.contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<contact, Integer> {
}
