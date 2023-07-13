package com.film_project.filmService.models;

import javax.persistence.*;

@Entity
@Table(name = "genres")
public class Genre {

    @Id
    private Long id;
    @Column(name = "genre")
    private String genre;
    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Film film;

    public Genre(){};

    public Genre(Long id, String genre, Film film) {
        this.id = id;
        this.genre = genre;
        this.film = film;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }
}
