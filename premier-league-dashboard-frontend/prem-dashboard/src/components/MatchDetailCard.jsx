import {React} from 'react';
import { Link } from 'react-router-dom';
import "./MatchDetailCard.scss"

export const MatchDetailCard = ({teamName, fixture}) =>{
    if (!fixture) return null

    const otherTeam = fixture.homeTeam === teamName ? fixture.awayTeam : fixture.homeTeam;
    const otherTeamRoute = `/teams/${otherTeam}`;
    const isMatchWon = teamName === fixture.winner || fixture.winner === "Draw";

  return (
    <>
      <div className={isMatchWon ? 'MatchDetailCard won-card' : 'MatchDetailCard lost-card'}>
        <div className='text'>
            <h1>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h1>
            <h2 className='fixture-date'>{fixture.date}</h2>
            <h2 className='fixture-score'>{fixture.score}</h2>
        </div>
        <div className='other-stats text'>
            <h3>Venue:</h3>
            <h4>{fixture.venue}</h4>
            <h3>Attendance:</h3>
            <h4>{fixture.attendance}</h4>
            <h3>Referee: </h3>
            <h4>{fixture.referee}</h4>
        </div>
      </div>
    </>
  )
}
