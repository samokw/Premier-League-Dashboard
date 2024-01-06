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
        <h3>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h3>
        <h5>{fixture.score}</h5>
      </div>
    </>
  )
}
