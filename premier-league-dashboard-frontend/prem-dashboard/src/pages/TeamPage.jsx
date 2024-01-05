import {React, useEffect, useState} from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () =>{

    const [team, setTeam] = useState({fixtures:[]})

    useEffect(
        () => {
            const fetchFixtures = async () => {
                const response = await fetch('http:///localhost:8080/team/Newcastle Utd');
                const data = await response.json();
                setTeam(data)
                console.log(data)
            };
            fetchFixtures();
        }, []
    );
  return (
    <>
      <div className='TeamPage'>
        <h1>{team.teamName}</h1>
        <MatchDetailCard fixture = {team.fixtures[0]}/>
        {Array.isArray(team.fixtures) &&
        team.fixtures.slice(1).map(fixture => <MatchSmallCard fixture={fixture}/>)}
      </div>
    </>
  )
}
