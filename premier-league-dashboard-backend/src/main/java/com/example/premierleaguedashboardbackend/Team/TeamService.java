package com.example.premierleaguedashboardbackend.Team;

import com.example.premierleaguedashboardbackend.Fixture.Fixture;
import com.example.premierleaguedashboardbackend.Fixture.FixtureRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {
    TeamRepository teamRepository;
    FixtureRepository fixtureRepository;

    public TeamService(TeamRepository teamRepository, FixtureRepository fixtureRepository){
        this.teamRepository = teamRepository;
        this.fixtureRepository = fixtureRepository;
    }

    public Page<Team> getTeamsByLeagueId(Long leagueId, Pageable pageable) {
        return teamRepository.findTeamsByLeagueId(leagueId, pageable);
    }
    //Puts all fixtures into a list, which are all passes through a loop

    public void updateAllTeamStats(){
        List<Fixture> allFixtures = fixtureRepository.findAll();
        for(Fixture fixture : allFixtures){
            System.out.println(fixture.getHomeTeam() + " VS " + fixture.getAwayTeam() +" : " +fixture.getWinner() + " Score: " + fixture.getScore());
            updateTeamStats(fixture);
        }
        System.out.println(allFixtures.size());
    }
    private void updateTeamStats(Fixture fixture){
        String homeTeamName = fixture.getHomeTeam();
        String awayTeamName = fixture.getAwayTeam();
        String winner = fixture.getWinner();
        updateTeamStatsforFixture(homeTeamName, winner);
        updateTeamStatsforFixture(awayTeamName, winner);

    }

    private void updateTeamStatsforFixture(String teamName, String winner){
        Optional<Team> teamOptional = teamRepository.findByTeamName(teamName);
        Team team;

        if(teamOptional.isEmpty()){
            team = new Team();
            team.setTeamName(teamName);
            team.setTotalMatches(1);
            team.setMatchesWon(teamName.equals(winner) ? 1 : 0);
        } else {
            team = teamOptional.get();
            team.setTotalMatches(team.getTotalMatches() + 1);
            team.setMatchesWon(team.getMatchesWon() + (teamName.equals(winner) ? 1 : 0));
        }
        teamRepository.save(team);
    }
}
