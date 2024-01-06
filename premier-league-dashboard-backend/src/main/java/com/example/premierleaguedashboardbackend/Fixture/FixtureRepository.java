package com.example.premierleaguedashboardbackend.Fixture;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FixtureRepository extends JpaRepository <Fixture, Long>{
    List<Fixture> getByHomeTeamOrAwayTeamOrderByDateDesc(String homeTeam, String awayTeam, Pageable pageable);
    //List<Fixture> getByHomeTeamOrAwayTeamAndSeasonOrderByDateDesc(String homeTeam, String awayTeam, String season);
    @Query("SELECT f from Fixture f WHERE (f.homeTeam = :teamName or f.awayTeam = :teamName) AND f.season = :season ORDER BY f.date DESC")
    List<Fixture> getFixturesByTeamForSeason(@Param("teamName") String teamName,  @Param("season") String season);
    @Query("SELECT DISTINCT f.season FROM Fixture f WHERE f.homeTeam = :teamName OR f.awayTeam = :teamName")
    List<String> getSeasonsForTeam(@Param("teamName") String teamName);
    default List<Fixture> findLatestMatchesByTeam(String teamName, int count){
        return getByHomeTeamOrAwayTeamOrderByDateDesc(teamName, teamName, PageRequest.of(0, count));
    }
}
