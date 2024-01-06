import { React } from "react";
import { Link } from 'react-router-dom';
import './NavBar.scss';

export const NavBar = () => {

  return (
    <div className="NavBar">
      <Link to={``}> <h1 className="text">Home</h1></Link>
    </div>
  );
}