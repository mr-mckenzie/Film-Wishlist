package com.film_project.filmService.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "films")
public class Film {

    @Id
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "original_title")
    private String originalTitle;
    @Column(name = "overview")
    private String overview;
    @Column(name = "poster_path")
    private String posterPath;
    @Column(name = "release_date")
    private String releaseDate;
    @Column(name = "runtime")
    private int runtime;
    @Column(name = "genres")
    @JsonIgnoreProperties({"film"})
    @OneToMany(mappedBy = "film")
    private List<Genre> genres;
    @Column(name = "keywords")
    @JsonIgnoreProperties({"film"})
    @OneToMany(mappedBy = "film")
    private List<Keyword> keywords;
    @Column(name = "cast")
    @JsonIgnoreProperties({"film"})
    @OneToMany(mappedBy = "film")
    private List<Person> cast;
    @Column(name = "crew")
    @JsonIgnoreProperties({"film"})
    @OneToMany(mappedBy = "film")
    private List<Person> crew;
    @Column(name = "production_countries")
    @JsonIgnoreProperties({"film"})
    @OneToMany(mappedBy = "film")
    private List<ProductionCountry> productionCountries;
    @Column(name = "rating")
    private int rating;

    public Film() {
    }

    public Film(Long id, String title, String originalTitle, String overview, String posterPath, String releaseDate, int runtime, List<Genre> genres, List<Keyword> keywords, List<Person> cast, List<Person> crew, List<ProductionCountry> productionCountries, int rating) {
        this.id = id;
        this.title = title;
        this.originalTitle = originalTitle;
        this.overview = overview;
        this.posterPath = posterPath;
        this.releaseDate = releaseDate;
        this.runtime = runtime;
        this.genres = genres;
        this.keywords = keywords;
        this.cast = cast;
        this.crew = crew;
        this.productionCountries = productionCountries;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getRuntime() {
        return runtime;
    }

    public void setRuntime(int runtime) {
        this.runtime = runtime;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public List<Keyword> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<Keyword> keywords) {
        this.keywords = keywords;
    }

    public List<Person> getCast() {
        return cast;
    }

    public void setCast(List<Person> cast) {
        this.cast = cast;
    }

    public List<Person> getCrew() {
        return crew;
    }

    public void setCrew(List<Person> crew) {
        this.crew = crew;
    }

    public List<ProductionCountry> getProductionCountries() {
        return productionCountries;
    }

    public void setProductionCountries(List<ProductionCountry> productionCountries) {
        this.productionCountries = productionCountries;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
