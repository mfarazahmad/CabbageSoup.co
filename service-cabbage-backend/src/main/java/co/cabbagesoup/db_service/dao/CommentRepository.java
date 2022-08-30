package co.cabbagesoup.db_service.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import co.cabbagesoup.db_service.models.Comments;

@Transactional
@Repository
public interface CommentRepository extends JpaRepository<Comments, Long>{

	List<Comments> findByName(String name);
}
