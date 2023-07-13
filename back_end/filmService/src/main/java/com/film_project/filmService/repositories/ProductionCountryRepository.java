package com.film_project.filmService.repositories;

import com.film_project.filmService.models.ProductionCountry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionCountryRepository extends JpaRepository<ProductionCountry, Long> {
}
