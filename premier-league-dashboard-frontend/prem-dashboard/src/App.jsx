import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.scss'
import { TeamPage } from './pages/TeamPage'
import { FixturePage } from './pages/FixturePage'
import { HomePage } from './pages/HomePage'
import { NavBar } from './components/NavBar'
import { LandingPage } from './pages/LandingPage'
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-NJ3PLPGX', 
};

TagManager.initialize(tagManagerArgs);

function App() {
  return (
    <>
      <div className='App'>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/league' element={<LandingPage/>}/>
            <Route path="/teams/league/:leagueId" element={<HomePage />} />
            <Route path='/teams/:teamName' element={<TeamPage/>}/>
            <Route path='/teams/:teamName/matches/:season' element={<FixturePage/>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
