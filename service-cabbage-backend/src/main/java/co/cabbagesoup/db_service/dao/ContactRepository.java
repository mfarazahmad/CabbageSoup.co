package co.cabbagesoup.db_service.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import co.cabbagesoup.db_service.models.Contact;

@Transactional
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long>{
	
	List<Contact> findByName(String name);
	List<Contact> findByContactType(String contactType);
	
}
