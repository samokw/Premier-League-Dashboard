package com.example.premierleaguedashboardbackend.Team;

import com.example.premierleaguedashboardbackend.Fixture.Fixture;
import com.example.premierleaguedashboardbackend.Fixture.FixtureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team")
@CrossOrigin
public class TeamController {
    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamService teamService;

    @Autowired
    FixtureRepository fixtureRepository;
    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams(){
        return ResponseEntity.ok(teamRepository.findAll());
    }
    @GetMapping("/{teamName}")
    public Team getTeam(@PathVariable String teamName){
        Team team = teamRepository.findByTeamName(teamName).get();
        team.setFixtures(fixtureRepository.findLatestMatchesByTeam(teamName, 4));
        return team;
    }
    @GetMapping("/{teamName}/matches")
    public List<Fixture> getFixturesForTeam(@PathVariable String teamName, @RequestParam String season){
        System.out.println(season);
        return fixtureRepository.getFixturesByTeamForSeason(teamName, season);
    }
    @GetMapping("/season/{teamName}")
    public List<String> getSeasonsInPrem(@PathVariable String teamName){
        return fixtureRepository.getSeasonsForTeam(teamName);
    }
}
