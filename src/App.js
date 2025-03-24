import React, { useState } from 'react';
import LoginForm from './Components/LoginForm/Login-Form';
import Profile from './Components/Dashboard/Profile'
import { Route ,  Routes , useNavigate } from 'react-router-dom';






function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard")
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/")
  };

  return (
  
      <Routes>
         <Route path="/" element={<LoginForm onAuthSuccess={handleLogin} />} />
        {isAuthenticated && <Route path="/dashboard" element={<Profile onLogout={handleLogout} />} />}
      </Routes>
   
  );
}

export default App;
