package com.film_project.filmService;

import com.film_project.filmService.models.Film;
import com.film_project.filmService.models.Genre;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
public class GenreTests {

    @Autowired


    Film film;

    @Test
    public void canCreateGenre() {

        Genre horror = new Genre(1L, "horror", film);
    }





}
