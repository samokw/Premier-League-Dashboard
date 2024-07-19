import { React, useState, useEffect } from "react"
import { TeamTile } from "../components/TeamTile";
import './HomePage.scss'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Typography } from "@mui/material";

const darkTheme = createTheme({ palette: { mode: 'dark' } });
export const HomePage = () => {
    const [teams, setTeams] = useState([])
    useEffect(
        () => {
            const fetchAllTeams = async () => {
                const response = await fetch(`http:///localhost:8080/team`);
                const data = await response.json();
                setTeams(data)
                console.log(data)
            };
            fetchAllTeams();
        }, []
    );
    return (
        <ThemeProvider theme={darkTheme}>
            <div className='HomePage'>
                <div className="header-name">
                    <h3 className="name">Historical Fixture Premier League Dashboard</h3>
                </div>
            </div>
            <Box sx={{ width: '75%', margin: '0 auto', paddingBottom: '20px', justifyContent: 'center', textAlign: 'center' }}>
                <img
                    src="/vecteezy_premier-league-symbol-logo-white-and-black-design-england_10994266.jpg"
                    alt="Premier League Logo"
                    style={{ width: '200px', height: 'auto' }}
                />
                <Typography variant="h4" sx={{ fontFamily: "system-ui", fontWeight: 'bold', color: "white" }}>
                Welcome To the Premier League Dashboard. Below is a list of teams in the Premier League since the 2009/2010 season. You will see an interactive chart for the win-loss ratio and the most recent matches the team has played. There's also an option to view all premier league fixtures a specific team has played since 2009/2010.
                </Typography>
            </Box>
            <Grid item xs={6}>
                <Box sx={{
                    p: 2,
                    color: 'purple',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                }}
                >
                    {teams.map(team => <TeamTile key={team.id} teamName={team.teamName} />)}
                </Box>
            </Grid>
        </ThemeProvider>
    )
}