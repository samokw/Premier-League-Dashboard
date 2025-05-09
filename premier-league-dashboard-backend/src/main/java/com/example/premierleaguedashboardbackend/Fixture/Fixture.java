package com.example.premierleaguedashboardbackend.Fixture;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "matches")
public class Fixture {
    @Id
    @Column(name = "match_id")
    private Long matchId;

    @Column(name = "leagueid")
    private Long leagueId;

    @Column(name = "Wk")
    private Integer week;

    @Column(name = "Date")
    private LocalDate date;

    @Column(name = "Home")
    private String homeTeam;

    @Column(name = "Away")
    private String awayTeam;

    @Column(name = "Score")
    private String score;

    @Column(name = "Attendance")
    private String attendance;

    @Column(name = "Venue")
    private String venue;

    @Column(name = "Referee")
    private String referee;

    @Column(name = "Season")
    private String season;

    @Column(name = "Winner")
    private String winner;

}
