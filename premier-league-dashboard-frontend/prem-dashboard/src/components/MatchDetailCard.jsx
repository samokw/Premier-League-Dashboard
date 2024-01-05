import {React} from 'react';

export const MatchDetailCard = ({fixture}) =>{
    if (!fixture) return null
  return (
    <>
      <div className='MatchDetailCard'>
        <h3>Latest Matches</h3>
        <h3>Match Details</h3>
        <h4>{fixture.homeTeam} vs {fixture.awayTeam}</h4>
      </div>
    </>
  )
}
