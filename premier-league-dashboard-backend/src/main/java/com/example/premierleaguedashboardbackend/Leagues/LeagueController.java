package com.example.premierleaguedashboardbackend.Leagues;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/league")
@CrossOrigin(origins = "https://www.samokw.name") // Allow requests from the frontend
public class LeagueController {
    private final LeagueService leagueService;

    public LeagueController(LeagueService leagueService) {
        this.leagueService = leagueService;
    }
    

    @GetMapping
    public ResponseEntity<List<League>> getAllLeagues() {
        return ResponseEntity.ok(leagueService.getAllLeagues());
    }
}
