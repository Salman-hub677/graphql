import React, { useState, Suspense } from 'react';

import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import './App.css';

const LoginForm = React.lazy(() => import('./Components/LoginForm/Login-Form'));
const Profile = React.lazy(() => import('./Components/Dashboard/Profile'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

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
    <Suspense fallback={<div className="loading-screen">Loading...</div>}>
      <Routes>
        {!isAuthenticated && <Route path="/" element={<LoginForm onAuthSuccess={handleLogin} />} />}
        {isAuthenticated && <Route path="/dashboard" element={<Profile onLogout={handleLogout} />} />}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
