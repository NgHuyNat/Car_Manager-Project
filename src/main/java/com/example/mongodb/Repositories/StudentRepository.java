package com.example.mongodb.Repositories;

import com.example.mongodb.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, Integer> {

    }