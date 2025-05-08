package com.example.premierleaguedashboardbackend.Team;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByTeamName(String teamName);
    @Query("SELECT DISTINCT t FROM Team t " +
            "JOIN Fixture f ON t.teamName = f.homeTeam OR t.teamName = f.awayTeam " +
            "WHERE f.leagueid = :leagueId")
    Page<Team> findTeamsByLeagueId(@Param("leagueId") Long leagueId, Pageable pageable);

}
