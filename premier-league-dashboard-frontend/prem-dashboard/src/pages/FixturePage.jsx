import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { MatchDetailCard } from '../components/MatchDetailCard';
import './FixturePage.scss'
import { MatchSmallCard } from '../components/MatchSmallCard';
import { SeasonSelector } from '../components/SeasonSelector';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export const FixturePage = () =>{
    const [fixtures, setFixtures] = useState([]);
    const { teamName, season } = useParams();


    useEffect(
        () => {
            const fetchFixtures = async () => {
                const response = await fetch(`https://api.samokw.name/team/${teamName}/matches?season=${season}`);
                const data = await response.json();
                setFixtures(data)
            };
            fetchFixtures();
        }, [teamName, season]
    );

    return (
        <>
        <div className='FixturePage'>
            <div className='years'>
            <h4>Select Year</h4>
                <SeasonSelector teamName={teamName}/>
            </div>
            <div>
            <h4 className='fixture'>Fixtures</h4>
            {fixtures.map((fixture, index) => (<MatchDetailCard key={index} teamName={teamName} fixture={fixture}/>))}
            </div>
        </div>
        </>
    )
}
