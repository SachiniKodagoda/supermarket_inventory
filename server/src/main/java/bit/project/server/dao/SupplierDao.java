package bit.project.server.dao;

import bit.project.server.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface SupplierDao extends JpaRepository<Supplier, Integer>{

    Supplier findByEmail(String email);
    Supplier findByCode(String code);
    Supplier findByName(String name);
}
