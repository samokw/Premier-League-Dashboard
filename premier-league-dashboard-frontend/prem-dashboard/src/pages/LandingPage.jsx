import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const leagueImages = {
    1: 'assets/Premier-League.png',
    2: '/assets/laliga.svg',
    3: '/assets/seriea.png',
    4: '/assets/Bundesliga.webp'
  };
  export const LandingPage = () => {
    const [leagues, setLeagues] = useState([]);
  
    useEffect(() => {
      const fetchLeagues = async () => {
        try {
          const response = await fetch('https://api.samokw.name/league');
          const data = await response.json();
          setLeagues(data);
        } catch (error) {
          console.error('Failed to fetch leagues:', error);
        }
      };
      fetchLeagues();
    }, []);
  
    return (
        <Box sx={{ padding: '20px', textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              marginBottom: '20px',
              color: 'white',
              fontSize: '3rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)',
            }}
          >
            Welcome to FixtureSphere
          </Typography>
          <Typography
            variant="h6"
            sx={{
                color: 'white',
                fontSize: '1.7rem',
                fontWeight: 600,
                maxWidth: '800px', // Limits the width for better alignment
                margin: '0 auto', // Centers the text
                textAlign: 'center', // Ensures centered alignment
                lineHeight: '1.5',
                paddingX: '10px', // Adds horizontal padding for smaller screens
                marginBottom: '40px',
            }}
            >
            Explore football fixtures with ease. Access the latest fixtures, a detailed interactive win-rate chart, and historical match data, all at your fingertips.
            </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '40px',
              color: 'white',
              fontSize: '1.2rem',
              textAlign: 'center',
            }}
          >
            Select a league to view its teams.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {leagues.map((league) => (
              <Grid item xs={6} sm={4} md={2} key={league.league_id}>
                <Link to={`/teams/league/${league.league_id}`} style={{ textDecoration: 'none' }}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: '20px',
                      textAlign: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      borderRadius: '10px',
                      transition: 'transform 0.3s, background-color 0.3s',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <img
                      src={leagueImages[league.league_id]}
                      alt={`${league.league_name} logo`}
                      style={{
                        width: 'auto',
                        height: '100px',
                        marginBottom: '10px',
                        transition: 'transform 0.3s',
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: '1.2rem',
                      }}
                    >
                      {league.league_name}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              marginTop: '40px',
              textAlign: 'center',
              color: 'white',
              fontSize: '1rem',
              opacity: 0.7,
            }}
          >
            Built for football fans by FixtureSphere | © {new Date().getFullYear()}
          </Box>
        </Box>
      );
      
  };