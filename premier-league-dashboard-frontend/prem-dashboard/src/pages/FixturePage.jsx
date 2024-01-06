import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { MatchDetailCard } from '../components/MatchDetailCard';
import './FixturePage.scss'
import { MatchSmallCard } from '../components/MatchSmallCard';
import { SeasonSelector } from '../components/SeasonSelector';

export const FixturePage = () =>{
    const [fixtures, setFixtures] = useState([]);
    const { teamName, season } = useParams();


    useEffect(
        () => {
            const fetchFixtures = async () => {
                console.log(`http:///localhost:8080/team/${teamName}/matches?season=${season}`)
                const response = await fetch(`http:///localhost:8080/team/${teamName}/matches?season=${season}`);
                const data = await response.json();
                setFixtures(data)
                console.log(data)
            };
            fetchFixtures();
        }, [teamName, season]
    );

    return (
        <>
        <div className='FixturePage'>
            <div className='years'>
            <h3>Select Year</h3>
                <SeasonSelector teamName={teamName}/>
            </div>
            <div>
            <h1>Fixtures</h1>
            {fixtures.map((fixture, index) => (<MatchDetailCard key={index} teamName={teamName} fixture={fixture}/>))}
            </div>
        </div>
        </>
    )
}
