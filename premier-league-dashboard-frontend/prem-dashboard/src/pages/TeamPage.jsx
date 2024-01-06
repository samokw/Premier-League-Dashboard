import "./TeamPage.scss"
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TeamPage = () =>{
    const [team, setTeam] = useState({fixtures:[]})
    const {teamName} = useParams();
    const [seasons, setSeason] = useState([]);
    const data = {
        labels: ['Games Won', 'Games Not Won'],
        datasets: [{
            data: [team.matchesWon, team.totalMatches - team.matchesWon],
            backgroundColor: ['#0ad573', '#e90052']
        }]
    };
    const options = {
        legend: {
            labels: {
              fontColor: 'white', // Change legend label color here
              fontSize: 24 // Change legend label font size here
            }
          }
    };
    useEffect(
        () => {
            const fetchFixtures = async () => {
                const response = await fetch(`http:///localhost:8080/team/${teamName}`);
                const data = await response.json();
                setTeam(data)
                console.log(data)
            };
            fetchFixtures();
        }, [teamName]
    );
    useEffect(
        () => {
            const fetchSeasons = async () => {
                console.log(`http:///localhost:8080/team/season/${teamName}`)
                const response = await fetch(`http:///localhost:8080/team/season/${teamName}`);
                const data = await response.json();
                setSeason(data)
                console.log(data)
            };
            fetchSeasons();
        }, [teamName]
    );
    seasons.sort((a, b) => {
        return new Date(b.split("-")[0]) - new Date(a.split("-")[0]);
    });
    if (!team || !team.teamName) {
        return [];
    } 
    return (
        <>
        <div className='TeamPage'>
            <div className="team-name">
                <h1 className="team-name-text">{team.teamName}</h1>
            </div>
            <div className="win-loss">
                <Pie data={data}/>
            </div>
            <div className="match-detail">
            <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} fixture = {team.fixtures[0]}/>
            </div>
            {Array.isArray(team.fixtures) &&
            team.fixtures.slice(1).map((fixture, index) => <MatchSmallCard key={index} teamName={team.teamName} fixture={fixture}/>)}
            <div className="more">
            <Link to={`/teams/${teamName}/matches/${seasons[0]}`}><h6 className="heading">More Matches &gt; </h6></Link>
            </div>
        </div>
        </>
    )
}
