package service;

import java.math.BigDecimal;

import java.util.Date;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import model.AppliedTenders;
import model.Tenders;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TenderExpirationService {

    @PersistenceContext
    private EntityManager entityManager;

    @Scheduled(cron = "0 0 * * * *")
    public void deleteExpiredTenders() {
        System.out.println("Scheduled task started...");

        Date currentDate = new Date();

        Query query = entityManager.createQuery("SELECT t FROM Tenders t WHERE t.endsOn < :currentDate", Tenders.class);
        query.setParameter("currentDate", currentDate);
        List<Tenders> expiredTenders = query.getResultList();

        List<AppliedTenders> allAppliedTenders = entityManager.createQuery("SELECT at FROM AppliedTenders at", AppliedTenders.class).getResultList();

        for (AppliedTenders appliedTender : allAppliedTenders) {
        	if (appliedTender != null) {
            for (Tenders tender : expiredTenders) {
                BigDecimal threshold = tender.getAmount();
                BigDecimal tenderAmount = BigDecimal.valueOf(appliedTender.getAmount());

                if (tenderAmount.compareTo(threshold) < 0) {
                    appliedTender.setStatus("success");
                    break; // Exit inner loop as we found a matching tender
                } else {
                    appliedTender.setStatus("failed");
                }
            }
        	}
        }

        Query deleteQuery = entityManager.createQuery("DELETE FROM Tenders t WHERE t.endsOn < :currentDate");
        deleteQuery.setParameter("currentDate", currentDate);
        int deletedCount = deleteQuery.executeUpdate();

        System.out.println(deletedCount + " expired tenders deleted.");
        System.out.println("Scheduled task completed.");
    }
}
