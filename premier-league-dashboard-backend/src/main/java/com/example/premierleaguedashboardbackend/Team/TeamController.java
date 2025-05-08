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

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        return ResponseEntity.ok(teamService.getAllTeams());
    }

    @GetMapping("/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        return teamService.getTeamWithLatestFixtures(teamName, 4);
    }

    @GetMapping("/{teamName}/matches")
    public List<Fixture> getFixturesForTeam(@PathVariable String teamName, @RequestParam String season) {
        return teamService.getFixturesByTeamAndSeason(teamName, season);
    }

    @GetMapping("/season/{teamName}")
    public List<String> getSeasons(@PathVariable String teamName) {
        return teamService.getSeasonsForTeam(teamName);
    }

    @GetMapping("/league/{leagueId}")
    public ResponseEntity<Page<Team>> getTeamsByLeagueId(
            @PathVariable Long leagueId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(teamService.getTeamsByLeagueId(leagueId, PageRequest.of(page, size)));
    }
}
