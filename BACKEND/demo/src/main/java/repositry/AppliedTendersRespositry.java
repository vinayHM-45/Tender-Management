package repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.AppliedTenders;

@Repository
public interface AppliedTendersRespositry extends JpaRepository<AppliedTenders, Long> {
	

}
