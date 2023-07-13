package com.film_project.filmService.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "cast")
public class Cast {

    @Id
    private Long id;

    @Column(name = "film_id")
    private Long film_id;

    @Column(name = "person_id")
    private Long person_id;

    @Column(name = "character")
    private String character;

    @ManyToOne
    @JoinColumn(name = "people", nullable = false)
    private Person person;

    @ManyToOne
    @JoinColumn(name = "film", nullable = false)
    private Film film;
}
