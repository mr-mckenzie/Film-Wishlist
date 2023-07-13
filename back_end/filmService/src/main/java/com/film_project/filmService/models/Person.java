package com.film_project.filmService.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "people")
public class Person {

    @Id
    private Long id;

    @OneToMany(mappedBy = "person")
    private List<Crew> crewList;

    @OneToMany(mappedBy = "person")
    private List<Cast> castList;

    @Column
    private String name;
}
