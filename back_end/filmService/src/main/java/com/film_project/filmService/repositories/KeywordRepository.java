package com.film_project.filmService.repositories;

import com.film_project.filmService.models.Film;
import com.film_project.filmService.models.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
}
