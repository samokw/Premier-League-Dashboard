import "./TeamPage.scss"
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';


export const TeamPage = () => {
    const [team, setTeam] = useState({ fixtures: [] });
    const { teamName } = useParams();
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
        const fetchFixtures = async () => {
            const response = await fetch(`https://api.samokw.name/team/${teamName}`);
            const data = await response.json();
            setTeam(data);
        };
        fetchFixtures();
    }, [teamName]);

    useEffect(() => {
        const fetchSeasons = async () => {
            const response = await fetch(`https://api.samokw.name/team/season/${teamName}`);
            const data = await response.json();
            setSeasons(data);
        };
        fetchSeasons();
    }, [teamName]);
    seasons.sort((a, b) => {
        return new Date(b.split("-")[0]) - new Date(a.split("-")[0]);
    });

    if (!team || !team.teamName || !team.matchesWon || !team.totalMatches || !seasons) {
        return null; // or any loading indicator
    }

    const data = [
        { value: team.matchesWon, label: 'Games Won', color: '#0ad573' },
        { value: (team.totalMatches - team.matchesWon), label: 'Games Not Won', color: '#e90052' },
    ];

    return (
        <>
            <div className='TeamPage'>
                <div className="team-name">
                    <h1 className="team-name-text">{team.teamName}</h1>
                </div>
                <div className="win-loss">
                        <PieChart
                            series={[
                                {
                                    data,
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                }
                            ]}
                            slotProps={{
                                legend: {
                                  labelStyle: {
                                    fontSize: 20,
                                    fill: 'white',
                                  },
                                },
                              }}
                            height={300}
                            width={800}
                        />
                </div>
                <div className="match-detail">
                    <h2>Latest Match</h2>
                    <MatchDetailCard teamName={team.teamName} fixture={team.fixtures[0]} />
                    <h2>Previous Matches</h2>
                </div>
                {Array.isArray(team.fixtures) &&
                    team.fixtures.slice(1).map((fixture, index) => <MatchSmallCard key={index} teamName={team.teamName} fixture={fixture} />)}
                <div className="more">
                    <Link to={`/teams/${teamName}/matches/${seasons[0]}`}><h4 className="heading">More Matches &gt; </h4></Link>
                </div>
            </div>
        </>
    );
};
