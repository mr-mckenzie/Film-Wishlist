package com.film_project.filmService.controllers;

import com.film_project.filmService.models.Film;
import com.film_project.filmService.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class FilmController {

    @Autowired
    FilmRepository filmRepository;

    @GetMapping(value = "/films")
    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    @GetMapping(value = "films/{id}")
    public Optional<Film> getFilm(@PathVariable Long id) {
        return filmRepository.findById(id);
    }
}