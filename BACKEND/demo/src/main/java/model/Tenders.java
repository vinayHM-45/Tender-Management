package model;

import java.math.BigDecimal;
import java.sql.Date;

import org.springframework.scheduling.annotation.EnableScheduling;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import lombok.Data;

@Data
@EnableScheduling
@Entity
@Table(name="tender")
public class Tenders {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "name")
	private String name;
	

	@Column(name = "Details")
	private String Details;

	@Column(name = "amount")
	private BigDecimal amount;

	@Column(name = "ends_on")
    @Temporal(TemporalType.DATE)
    private Date endsOn;

public long getId() {
	return id;
}

public void setId(long id) {
	this.id = id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

	public String getDetails() {
	return Details;
}

	public void setDetails(String details) {
		Details = details;
}

	public BigDecimal getAmount() {
		return amount;
	}

public void setAmount(BigDecimal amount) {
	this.amount = amount;
}

public Date getEndsOn() {
    return endsOn;
}

public void setEndsOn(Date endsOn) {
    this.endsOn = endsOn;
}
	public Tenders(long id, String name, String details, BigDecimal amount,Date endson) {
		super();
		this.id = id;
		this.name = name;
		this.Details = details;
		this.amount = amount;
		this.endsOn = endson;
	}
	public Tenders() {
		
	}
}

