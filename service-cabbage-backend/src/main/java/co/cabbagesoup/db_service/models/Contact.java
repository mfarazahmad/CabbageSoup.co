package co.cabbagesoup.db_service.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.ToString;

@Entity
@Table (name = "contact")
@Data
@ToString
public class Contact {
	
    @Id
	@Column(name = "ID", nullable = false)
	@SequenceGenerator(name = "CONTACT_ID", sequenceName = "ID_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CONTACT_ID")
	private Integer id;
	
	@Column (name = "NAME")
	private String name;
	
	@Column (name = "REQUESTTYPE")
	private String requestType;
	
	@Column (name = "CONTACTTYPE")
	private String contactType;
	
	@Column (name = "CONTACT")
	private String contact;
	
	@Column (name = "DISCOVERY")
	private String discovery;
	
	@Column (name = "BESTTIMETOREACH")
	private String bestTimeToReach;
	
	@Column (name = "MESSAGE")
	private String message;
	
	@Column (name = "CREATEDON", nullable = false)
	@CreationTimestamp
	private Date createdOn;
	
}