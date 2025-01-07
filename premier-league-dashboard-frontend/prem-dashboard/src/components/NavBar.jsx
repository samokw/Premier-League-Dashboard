import { React } from "react";
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './NavBar.scss';

function appBarLabel(label) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
        <HomeIcon sx={{ fontSize: 60 , color: "white"}}/>
      </IconButton>
      <Typography  variant="h2" sx={{ flexGrow: 1, fontFamily: "system-ui", fontWeight: 'bold', lineHeight: 1.5, fontSize: 40, color: "white" }}>
        {label}
      </Typography>
    </Toolbar>
  );
}
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export const NavBar = () => {

  return (
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <Link to={`/`}> 
          {appBarLabel('Home')}
          </Link>
        </AppBar>
      </ThemeProvider>
    </Stack>
    
  );
}