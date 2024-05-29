package repositry;

import java.sql.Date;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import model.Tenders;

@Repository
public interface TendersRepository extends JpaRepository<Tenders, Long> {
    List<Tenders> findAllByEndsOnBefore(Date currentDate);
}
