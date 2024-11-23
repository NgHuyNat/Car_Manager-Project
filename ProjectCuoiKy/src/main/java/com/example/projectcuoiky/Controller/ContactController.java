package com.example.projectcuoiky.Controller;

import com.example.projectcuoiky.Model.contact;
import com.example.projectcuoiky.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("contact")

public class ContactController {
    @Autowired
    private ContactService contactService;

    @GetMapping("")
    public ResponseEntity<List<contact>> findAll() {
        List<contact> contacts = contactService.findAll();
        return ResponseEntity.ok(contacts);
    }

    @PostMapping("/addcontact")
    public ResponseEntity<contact> addContact(@RequestBody Map<String, Object> payload) {
        try {
            contact newContact = contactService.saveContact(payload);
            return ResponseEntity.ok(newContact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/updatecontact/{id}")
    public ResponseEntity<contact> updateContact(@RequestBody Map<String, Object> payload, @PathVariable int id) {
        try {
            contact updatedContact = contactService.updateContact(id, payload);
            return ResponseEntity.ok(updatedContact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/deletecontact/{id}")
    public ResponseEntity<contact> deleteContact(@PathVariable int id) {
        try {
            contactService.deleteContact(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}