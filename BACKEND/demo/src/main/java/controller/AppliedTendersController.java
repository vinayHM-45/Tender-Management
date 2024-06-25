package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.AppliedTenders;

import repositry.AppliedTendersRespositry;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/")
public class AppliedTendersController {
	
	@Autowired
	private AppliedTendersRespositry appliedTendersRepository;
	
	@GetMapping("/appliedtenders")
	public List<AppliedTenders> getAllAppliedTenders(){
		return appliedTendersRepository.findAll();
	}
	
	@PostMapping("/appliedtenders")
	public AppliedTenders appliedTenders(@RequestBody AppliedTenders appliedtenders) {
		return appliedTendersRepository.save(appliedtenders);
	}
}
