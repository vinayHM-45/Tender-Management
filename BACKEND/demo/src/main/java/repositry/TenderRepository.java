package repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import model.Tenders;

@Repository
@EnableJpaRepositories
public interface TenderRepository extends JpaRepository<Tenders,Long>{
	
}
