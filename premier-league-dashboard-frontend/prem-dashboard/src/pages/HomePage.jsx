import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { TeamTile } from "../components/TeamTile";
import './HomePage.scss';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from "@mui/material";

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const leagueImages = {
    1: '/assets/Premier-League.png',
    2: '/assets/laliga.svg',
    3: '/assets/seriea.png',
    4: '/assets/Bundesliga.webp'
};
const leaguenames = {
    1: 'Premier League',
    2: 'La Liga',
    3: 'Serie A',
    4: 'Bundesliga'
};

export const HomePage = () => {
    const { leagueId } = useParams();
    const [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    const isFirstLoad = useRef(true); // Flag to track initial load

    const scrollToBottom = () => {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }, 300); // Delay to ensure DOM updates
    };

    useEffect(() => {
        const fetchTeamsByLeague = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.samokw.name/team/league/${leagueId}?page=${currentPage}&size=${pageSize}`
                );
                const data = await response.json();
                setTeams(data.content || []);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            } finally {
                setLoading(false);
                if (!isFirstLoad.current) {
                    scrollToBottom(); // Only scroll after initial load
                }
            }
        };
        fetchTeamsByLeague();
        isFirstLoad.current = false; // Mark as no longer the first load
    }, [currentPage, pageSize, leagueId]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1); // Pagination is 1-indexed
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div className='HomePage'>
                <div className="header-name">
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: 'system-ui',
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'center',
                            fontSize: '3rem',
                            marginBottom: '20px',
                        }}
                    >
                        Welcome to the {leaguenames[leagueId] || "League"} Dashboard
                    </Typography>
                </div>
                <Box
                    sx={{
                        width: '75%',
                        margin: '0 auto',
                        paddingBottom: '20px',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <img
                        src={leagueImages[leagueId]}
                        alt={`${leaguenames[leagueId]} Logo`}
                        style={{ width: 'auto', height: '200px' }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "system-ui",
                            fontWeight: 'normal',
                            color: "white",
                            marginTop: 2,
                            fontSize: '1.2rem'
                        }}
                    >
                        Below is a list of teams in the {leaguenames[leagueId]} since the 2009/2010 season. 
                        You will see an interactive chart for the win-loss ratio and the most recent matches played.
                    </Typography>
                </Box>
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '20px',
                        borderRadius: '10px',
                        margin: '20px auto',
                        width: '80%',
                    }}
                >
                    {loading ? (
                        <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                            Loading Teams...
                        </Typography>
                    ) : (
                        <Box
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                p: 2,
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr' },
                                gap: 2,
                                textAlign: 'center',
                            }}
                        >
                            {teams.map(team => (
                                <TeamTile
                                    key={team.id}
                                    teamName={team.teamName}
                                    logoUrl="/assets/soccer.png"
                                />
                            ))}
                        </Box>
                    )}
                </Paper>
                <Box
                    sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, minHeight: '60px' }}
                >
                    <Pagination
                        count={totalPages}
                        page={currentPage + 1}
                        onChange={handlePageChange}
                        shape="rounded"
                        variant="outlined"
                        size="large"
                    />
                </Box>
            </div>
        </ThemeProvider>
    );
};
