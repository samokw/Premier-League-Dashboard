package com.example.premierleaguedashboardbackend.Team;

import com.example.premierleaguedashboardbackend.Fixture.Fixture;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "teamName")
    private String teamName;
    @Column(name = "totalMatches")
    private Integer totalMatches;
    @Column(name = "matchesWon")
    private Integer matchesWon;

    @Transient
    private List<Fixture> fixtures;
}
