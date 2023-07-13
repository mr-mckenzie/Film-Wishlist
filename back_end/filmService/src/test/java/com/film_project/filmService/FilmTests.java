package com.film_project.filmService;

import com.film_project.filmService.models.Film;
import com.film_project.filmService.models.Genre;
import com.film_project.filmService.models.Keyword;
import com.film_project.filmService.models.ProductionCountry;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class FilmTests {


    Film film;
    Long id;
    String title;
    String originalTitle;
    String overview;
    String posterPath;
    String releaseDate;
    int runtime;
    List<ProductionCountry> productionCountries;
    List<Genre> genres;
    List<Keyword> keywords;



    @Before public void before() {
        id = 278L;
        title = "The Shawshank Redemption";
        originalTitle = "The Shawshank Redemption";
        overview = "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.";
        posterPath = "/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg";
        releaseDate = "1994-09-23";
        runtime = 142;
        productionCountries = new ArrayList<>();
        productionCountries.add("United States of America");
        genres = new ArrayList<>();
        genres.add( new Genre(101L, "Drama", film) );
        genres.add( new Genre(102L, "Crime", film) );
        keywords = new ArrayList<>();
//        keywords.add(new Keyword("prison"));
//        keywords.add(new Keyword("corruption"));
//        keywords.add(new Keyword("police brutality"));
//        keywords.add(new Keyword("based on novel or book"));
//        keywords.add(new Keyword("prison cell"));


    }

    @Test
    public void canCreateFilm() {

        Film film = new Film(
                id,
                title,
                originalTitle,
                overview,
                posterPath,
                releaseDate,
                runtime,
                productionCountries,
                genres,
                keywords,

        );
    }
}
