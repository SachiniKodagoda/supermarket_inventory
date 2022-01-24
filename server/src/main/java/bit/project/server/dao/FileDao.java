/*
 * Generated By Spring Data JPA Entity Generator
 * @author Niroshan Mendis
 */

package bit.project.server.dao;

import bit.project.server.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@RepositoryRestResource(exported=false)
public interface FileDao extends JpaRepository<File, String>{
    @Query("select new File (f.id, f.filemimetype, f.file) from File f where f.id = :id")
    Optional<File> findFileById (@Param("id") String id);

    @Transactional
    @Modifying
    @Query("update File f set f.isused=:isused where f.id = :id")
    Integer updateIsusedById (@Param("id") String id, @Param("isused") boolean isused);

    @Query("select new File (f.id, f.thumbnail, f.thumbnailmimetype) from File f where f.id = :id")
    Optional<File> findThumbnailById (@Param("id") String id);

    @Query("select new File (f.id, f.filesize, f.originalname, f.filemimetype) from File f where f.id = :id")
    Optional<File> findFileDetailsById (@Param("id") String id);

    @Query("select new File (f.id, f.tocreation) from File f where f.tocreation <= :lasthour and f.isused = false ")
    File[] findAllUnusedFilesByDateBefore (@Param("lasthour") LocalDateTime lasthour);

    @Transactional
    @Modifying
    @Query("delete from File f where f.tocreation <= :lasthour and f.isused = false ")
    void deleteUnusedFilesByDateBefore (@Param("lasthour") LocalDateTime lasthour);

}
