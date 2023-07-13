package com.film_project.filmService.models;

import javax.persistence.*;

@Entity
@Table(name = "production_countries")
public class ProductionCountry {

    @Id
    Long id;
    @Column(name = "name")
    String name;
    @Column(name = "short_name")
    String shortName;
    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    Film film;

    public ProductionCountry() {
    }

    public ProductionCountry(Long id, String name, String shortName, Film film) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.film = film;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }
}
