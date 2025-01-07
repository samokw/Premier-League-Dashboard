package com.example.premierleaguedashboardbackend.Leagues;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueRepository extends JpaRepository <League, Long>{

}
