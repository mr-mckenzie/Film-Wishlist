package com.film_project.filmService.repositories;

import com.film_project.filmService.models.Film;
import com.film_project.filmService.models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
}
