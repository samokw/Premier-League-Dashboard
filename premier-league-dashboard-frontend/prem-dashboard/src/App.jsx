import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.scss'
import { TeamPage } from './pages/TeamPage'
import { FixturePage } from './pages/FixturePage'
import { HomePage } from './pages/HomePage'
import { NavBar } from './components/NavBar'

function App() {
  return (
    <>
      <div className='App'>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/teams' element={<HomePage/>}/>
            <Route path='/teams/:teamName' element={<TeamPage/>}/>
            <Route path='/teams/:teamName/matches/:season' element={<FixturePage/>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
