package com.nghuytan.carmanager.controller;

import com.nghuytan.carmanager.model.Contact;
import com.nghuytan.carmanager.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("contact")

public class ContactController {
    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("")
    public ResponseEntity<List<Contact>> findAll() {
        List<Contact> contacts = contactService.findAll();
        return ResponseEntity.ok(contacts);
    }

    @PostMapping("/addcontact")
    public ResponseEntity<Contact> addContact(@RequestBody Map<String, Object> payload) {
        try {
            Contact newContact = contactService.saveContact(payload);
            return ResponseEntity.ok(newContact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/updatecontact/{id}")
    public ResponseEntity<Contact> updateContact(@RequestBody Map<String, Object> payload, @PathVariable int id) {
        try {
            Contact updatedContact = contactService.updateContact(id, payload);
            return ResponseEntity.ok(updatedContact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/deletecontact/{id}")
    public ResponseEntity<Contact> deleteContact(@PathVariable int id) {
        try {
            contactService.deleteContact(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}