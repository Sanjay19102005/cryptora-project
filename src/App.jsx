import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Verification from './pages/Verification'
import Dashboard from './pages/Dashboard'
import TopologySimulation from './pages/TopologySimulation'
import ActivityCorrelation from './pages/ActivityCorrelation'
import ProbableOriginIP from './pages/ProbableOriginIP'
import ForensicReport from './pages/ForensicReport'
import { isAuthenticated as checkAuth, logout as authLogout } from './utils/auth'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated using auth utilities
    setIsAuthenticated(checkAuth())
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('tor-unveil-auth', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    authLogout()
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignUp />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/verification" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Verification />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/topology" 
          element={
            isAuthenticated ? (
              <TopologySimulation onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/correlation" 
          element={
            isAuthenticated ? (
              <ActivityCorrelation onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/origin-ip" 
          element={
            isAuthenticated ? (
              <ProbableOriginIP onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/report" 
          element={
            isAuthenticated ? (
              <ForensicReport onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </Router>
  )
}

export default App

