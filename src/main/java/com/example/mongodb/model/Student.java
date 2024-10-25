package com.example.mongodb.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    private Integer rno;

    private String name;

    private String address;

}
