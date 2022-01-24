package bit.project.server.dao;

import bit.project.server.entity.Purchase;
import bit.project.server.entity.Purchase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface PurchaseDao extends JpaRepository<Purchase, Integer>{

    @Query("select new Purchase (p.id,p.code) from Purchase p")
    Page<Purchase> findAllBasic(PageRequest pageRequest);

    Purchase findByCode(String code);
}
