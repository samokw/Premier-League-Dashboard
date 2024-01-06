import {React, useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import './SeasonSelector.scss'
export const SeasonSelector = ({teamName}) =>{
    const [seasons, setSeason] = useState([]);
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
    return(
        <>
        <ol className="SeasonSelector">
            {seasons.map((season,index) =>  <Link key={index} to={`/teams/${teamName}/matches/${season}`}><li>{season}</li></Link>)}
        </ol>
        </>
    )
}