package com.example.premierleaguedashboardbackend.Team;

import com.example.premierleaguedashboardbackend.Fixture.Fixture;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "team_summary")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long id;

    @Column(name = "team_name") // Correct casing
    private String teamName;

    @Column(name = "total_matches") // Correct casing
    private Integer totalMatches;

    @Column(name = "matches_won") // Already correct
    private Integer matchesWon;

    @Transient
    private List<Fixture> fixtures;
}
