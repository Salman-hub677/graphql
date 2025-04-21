import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import * as THREE from "three";  
import NET from "vanta/dist/vanta.net.min";

const endpoint = "https://learn.reboot01.com/api/auth/signin";

const LoginForm = ({ onAuthSuccess }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("White");

  useEffect(() => {
    if (vantaRef.current && !vantaEffect) {
      const effectInstance = NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: color,
        backgroundColor: 0x000000,
        points: 20.0,
        THREE,
      });
      setVantaEffect(effectInstance);
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
    
  }, [vantaEffect,color]); 

 
  useEffect(() => {
    if (vantaEffect) {
      vantaEffect.setOptions({ color });
    }
  }, [color, vantaEffect]);

  const usersignin = async (e) => {
    e.preventDefault();
    setError("");
    let encodedCredentials;
    try {
      encodedCredentials = btoa(`${username}:${password}`);
    } catch (error) {
      console.error("Encoding Error:", error.message);
      encodedCredentials = null; 
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setColor("Red");
        setError("Invalid Credentials");
        throw new Error("Invalid Credentials");
      }

      const token = await response.json();

      if (token) {
        setColor("green");
        console.log("Login successful. Token:", token);
        setTimeout(() => {
          localStorage.setItem("token", token);
          onAuthSuccess();
        }, 1000);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div ref={vantaRef} className="bg d-flex justify-content-center align-items-center vh-100">
      <Container
        className="p-4 rounded text-light"
        style={{
          maxWidth: "400px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "10px",
        }}
      >
        <Form onSubmit={usersignin}>
          <h2 className="text-center mb-4">Login</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: "white", fontWeight: "bold" }}>
              Email/Username
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-dark text-light border-0">
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter email/username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-dark text-light border-0"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ color: "white", fontWeight: "bold" }}>
              Password
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-dark text-light border-0">
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-dark text-light border-0"
              />
            </InputGroup>
          </Form.Group>
          {error && <p className="text-danger text-center">{error}</p>}
          <Button
            style={{ backgroundColor: "#4B0082", border: "black" }}
            type="submit"
            className="w-100"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;
