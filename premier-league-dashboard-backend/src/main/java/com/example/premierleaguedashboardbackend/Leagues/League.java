package com.example.premierleaguedashboardbackend.Leagues;

import com.example.premierleaguedashboardbackend.Team.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "leagues")
public class League {
    @Id
    @Column(name = "leagueid")
    private Long league_id;

    @Column(name = "leaguename")
    private String league_name;

}
