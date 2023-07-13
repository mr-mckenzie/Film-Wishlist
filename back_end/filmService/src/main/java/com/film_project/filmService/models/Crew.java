package com.film_project.filmService.models;

import javax.persistence.*;

@Entity
@Table(name = "crew")
public class Crew {

    @Id
    private Long id;

    @Column(name = "film_id")
    private Long film_id;

    @Column(name = "person_id")
    private Long person_id;

    @Column(name = "role")
    private String role;

    @ManyToOne
    @JoinColumn(name = "people", nullable = false)
    private Person person;

    @ManyToOne
    @JoinColumn(name = "film", nullable = false)
    private Film film;


}
