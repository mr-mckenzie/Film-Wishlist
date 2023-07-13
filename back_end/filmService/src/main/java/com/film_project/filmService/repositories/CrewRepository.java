package com.film_project.filmService.repositories;

import com.film_project.filmService.models.Crew;
import com.film_project.filmService.models.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrewRepository extends JpaRepository<Crew, Long> {
}
