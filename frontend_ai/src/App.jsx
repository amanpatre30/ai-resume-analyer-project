import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SideBar from './component/SideBar/SideBar'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from './component/Dashboard/Dashboard'
import Login from './component/Login/Login'
import Admin from './component/Admin/Admin'
import History from './component/History/History'
import AuthProvider from './utils/AuthContext'
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='App'>
          <SideBar />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/admin' element={<Admin />} />
            <Route exact path='/history' element={<History />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
