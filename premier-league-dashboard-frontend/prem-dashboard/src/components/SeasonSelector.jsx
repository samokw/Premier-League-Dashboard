import { React, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './SeasonSelector.scss'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography } from "@mui/material";

export const SeasonSelector = ({ teamName }) => {
    const [seasons, setSeason] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);

    useEffect(
        () => {
            const fetchSeasons = async () => {
                const response = await fetch(`https://api.samokw.name/team/season/${teamName}`);
                const data = await response.json();
                setSeason(data)
            };
            fetchSeasons();
        }, [teamName]
    );
    seasons.sort((a, b) => {
        return new Date(b.split("-")[0]) - new Date(a.split("-")[0]);
    });
    return (
        <>
        <Timeline>
                {seasons.map((season, index) => 
                <TimelineItem key={index}>
                    <TimelineSeparator>
                        <TimelineDot />
                        {index !== seasons.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                    <Link key={index} to={`/teams/${teamName}/matches/${season}`}> 
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: selectedSeason === season ? '#2196f3' : 'white', whiteSpace: 'nowrap' }}
                    onClick={() => setSelectedSeason(season)}
                    >
                        {season.replace(/\r?\n|\r/g, "")}
                    </Typography>
                    </Link> 
                    </TimelineContent>
                </TimelineItem>)}
        </Timeline>
        </>
    )
}