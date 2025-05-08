package com.example.premierleaguedashboardbackend.Leagues;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class LeagueService {
    private final LeagueRepository leagueRepository;

    public LeagueService(LeagueRepository leagueRepository) {
        this.leagueRepository = leagueRepository;
    }

    public List<League> getAllLeagues() {
        return leagueRepository.findAll();
    }
}
