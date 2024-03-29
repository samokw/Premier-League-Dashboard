import { React, useState, useEffect } from "react"
import { TeamTile } from "../components/TeamTile";
import './HomePage.scss'
export const HomePage = () =>{
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
    return(
        <>
        <div className='HomePage'>
            <div className="header-name">
                <h1 className="name">Premier League Dashboard</h1>
            </div>
            <div className="team-grid">
                {teams.map(team => <TeamTile teamName={team.teamName}/>)}
            </div>
        </div>
        </>
    )
}