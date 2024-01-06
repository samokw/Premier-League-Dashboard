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
        <div>
            <h1>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h1>
            <h2 className='fixture-date'>{fixture.date}</h2>
            <h2 className='fixture-score'>{fixture.score}</h2>
        </div>
        <div className='other-stats'>
            <h4>Venue:</h4>
            <h5>{fixture.venue}</h5>
            <h4>Attendance:</h4>
            <h5>{fixture.attendance}</h5>
            <h4>Referee: </h4>
            <h5>{fixture.referee}</h5>
        </div>
      </div>
    </>
  )
}
