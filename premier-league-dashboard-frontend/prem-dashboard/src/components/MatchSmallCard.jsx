import {React} from 'react';

export const MatchSmallCard = ({fixture}) =>{
  return (
    <>
      <div className='MatchSmallCard'>
        <p>{fixture.homeTeam} vs {fixture.awayTeam}</p>
      </div>
    </>
  )
}
