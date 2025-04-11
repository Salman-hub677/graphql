import React, { useState, Suspense , useEffect} from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './Components/LoginForm/Login-Form';
import Profile from './Components/Dashboard/Profile'

 const isTokenExpired = (token) => {
  if (!token) return true; 
  try {
    const { exp } = jwtDecode(token); 
    const currentTime = Date.now() / 1000; 
    return exp < currentTime; 
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; 
  }
};

function App() { 
const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (isTokenExpired(token)) {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false);       
    navigate('/');                   
  }
}, [navigate]);

const handleLogin = () => {
  setIsAuthenticated(true);
  navigate("/dashboard");
};

const handleLogout = () => {
  localStorage.removeItem("token");
  setIsAuthenticated(false);
  navigate("/");
};

return (
  <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh" }}>
    <Suspense fallback={<div style={{ backgroundColor: '#1a1a1a', height: "100vh" }} />}>
      <Routes>
        {!isAuthenticated && <Route path="/" element={<LoginForm onAuthSuccess={handleLogin} />} />}
        {isAuthenticated && <Route path="/dashboard" element={<Profile onLogout={handleLogout} />} />}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
      </Routes>
    </Suspense>
  </div>
);
}

export default App;
