package bit.project.server.dao;

import bit.project.server.entity.Item;
import bit.project.server.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface ItemDao extends JpaRepository<Item, Integer>{

    Item findByName(String name);
    Item findByCode(String code);

    @Query("select new Item (i.id,i.code,i.name) from Item i")
    Page<Item> findAllBasic(PageRequest pageRequest);
}
