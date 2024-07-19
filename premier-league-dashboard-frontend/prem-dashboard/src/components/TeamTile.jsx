import React from "react"
import './TeamTile.scss'
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Team = styled(Paper)(({ theme }) => ({
    ...theme.typography.h4,
    textAlign: 'center',
    height: 60,
    backgroundColor: 'black',
    lineHeight: '60px',
    fontWeight: 'bold',
}));

export const TeamTile = ({teamName}) =>{
    return(
        
        <Link to={`/teams/${teamName}`} style={{ textDecoration: 'none' }}>
            <Team elevation={16} square>
                {teamName}
            </Team>
        </Link>

    )
}