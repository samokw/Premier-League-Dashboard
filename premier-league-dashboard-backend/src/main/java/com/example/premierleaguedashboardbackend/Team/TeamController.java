package com.example.premierleaguedashboardbackend.Team;

import com.example.premierleaguedashboardbackend.Fixture.Fixture;
import com.example.premierleaguedashboardbackend.Fixture.FixtureRepository;
import com.example.premierleaguedashboardbackend.Leagues.League;
import com.example.premierleaguedashboardbackend.Leagues.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team")
@CrossOrigin(origins = "https://www.samokw.name")
public class TeamController {
    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamService teamService;

    @Autowired
    FixtureRepository fixtureRepository;

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        return ResponseEntity.ok(teamRepository.findAll());
    }

    @GetMapping("/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team = teamRepository.findByTeamName(teamName).get();
        team.setFixtures(fixtureRepository.findLatestMatchesByTeam(teamName, 4));
        return team;
    }

    @GetMapping("/{teamName}/matches")
    public List<Fixture> getFixturesForTeam(@PathVariable String teamName, @RequestParam String season) {
        System.out.println(season);
        return fixtureRepository.getFixturesByTeamForSeason(teamName, season);
    }

    @GetMapping("/season/{teamName}")
    public List<String> getSeasons(@PathVariable String teamName) {
        return fixtureRepository.getSeasonsForTeam(teamName);
    }

    @GetMapping("/league/{leagueId}")
    public ResponseEntity<Page<Team>> getTeamsByLeagueId(
            @PathVariable Long leagueId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Team> teams = teamService.getTeamsByLeagueId(leagueId, pageable);
        return ResponseEntity.ok(teams);
    }
}
