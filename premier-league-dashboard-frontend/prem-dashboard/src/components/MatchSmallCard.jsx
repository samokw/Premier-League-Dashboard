import "./MatchSmallCard.scss"
import {React} from 'react';
import { Link } from 'react-router-dom';

export const MatchSmallCard = ({teamName, fixture}) =>{
    const otherTeam = fixture.homeTeam === teamName ? fixture.awayTeam : fixture.homeTeam;
    const otherTeamRoute = `/teams/${otherTeam}`;
    const isMatchWon = teamName === fixture.winner || fixture.winner === "Draw";
  return (
    <>
      <div className={isMatchWon ? 'MatchSmallCard won-card' : 'MatchSmallCard lost-card'}>
        <h3 className="text">vs <Link to={otherTeamRoute}>{otherTeam}</Link></h3>
        <h4 className="text">{fixture.score}</h4>
      </div>
    </>
  )
}
