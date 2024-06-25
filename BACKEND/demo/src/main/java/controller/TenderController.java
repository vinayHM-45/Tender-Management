package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import model.Tenders;
import repositry.TenderRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/")
public class TenderController {
	
	@Autowired
	private TenderRepository tenderRepository;
	
	@GetMapping("/tender")
	public List<Tenders> getAllTenders(){
		return tenderRepository.findAll();
	}
	@PostMapping("/tender")
	public Tenders setAllTenders(@RequestBody Tenders tenders){
		return tenderRepository.save(tenders);
	}
	
	@PostMapping("/applytenders")
	public Tenders applyTenders(@RequestBody Tenders tenders) {
		return tenderRepository.save(tenders);
	}
	
	
}
