import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login-Form.css";

const endpoint = "https://learn.reboot01.com/api/auth/signin";

const LoginForm = ({ onAuthSuccess }) => {
 
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const [error, setError] = useState("");

 

  const usersignin = async (e) => {
    e.preventDefault();
    setError(""); 
    const encodedCredentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${encodedCredentials}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Invalid Username or Password");
      }

      const token = await response.json();
     
      if (token) {
        console.log("Login successful. Token:", token);
        localStorage.setItem("token", token);
        onAuthSuccess()
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={usersignin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="Username/Email"
            value={username}
            onChange={ (e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
