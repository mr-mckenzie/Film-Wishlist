package com.film_project.filmService.models;

import javax.persistence.*;

@Entity
@Table(name = "keywords")
public class Keyword {

    @Id
    Long id;
    @Column(name = "keyword")
    String keyword;
    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    Film film;

    public Keyword() {
    }

    public Keyword(Long id, String keyword, Film film) {
        this.id = id;
        this.keyword = keyword;
        this.film = film;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }
}
