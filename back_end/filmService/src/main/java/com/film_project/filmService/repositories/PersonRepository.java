package com.film_project.filmService.repositories;

import com.film_project.filmService.models.Film;
import com.film_project.filmService.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}
