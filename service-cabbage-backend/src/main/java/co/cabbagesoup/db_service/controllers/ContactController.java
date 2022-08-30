package co.cabbagesoup.db_service.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.cabbagesoup.db_service.dao.ContactRepository;
import co.cabbagesoup.db_service.models.Contact;

@RestController
@CrossOrigin(origins = {"http://localhost:5000", "http://localhost:3000", "http://cabbagesoup.co", "http://cabbagesoup.co:3000"})
@RequestMapping("/contact")
public class ContactController {
	
	@Autowired
	ContactRepository repository;
	
	@GetMapping("/all")
	public List<Contact> getAllContacts() {
		return repository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Contact> getContact(@PathVariable int id) {
		return repository.findById((long) id);
	}
	
	@GetMapping("/{name}")
	public List<Contact> getContactByName(@PathVariable String name) {
		return repository.findByName(name);
	}
	
	@GetMapping("/type/{contactType}")
	public List<Contact> getContactByType(@PathVariable String contactType) {
		return repository.findByContactType(contactType);
	}
	
	@PostMapping("/save")
	public Contact saveContact(@RequestBody Contact newContact) {
		System.out.println("New Contact Received: ");
		System.out.println(newContact.toString());
		return repository.save(newContact);
	}
	
	@PutMapping("/update")
	public Contact updateContact(@RequestBody Contact updatedContact) {
		return repository.save(updatedContact);
	}

	@DeleteMapping("/{id}")
	public void deleteContact(@PathVariable int id) {
		repository.deleteById((long) id);
	}


}
