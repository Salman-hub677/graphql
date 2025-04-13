import React, { useEffect } from "react";
import { AuditGraph } from "../Graphs/AuditGraph";
import ProjectXPGraph from "../Graphs/ProjectXPGraph";
import PiscineGraph from "../Graphs/PiscineGraph";
import DatesGraph from "../Graphs/DatesProjectGraph";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {
  UserInfo,
} from "../Queries/Query";
import { useQuery } from "@apollo/client";

const Profile = ({ onLogout }) => {
 
  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: refetchUserData,
  } = useQuery(UserInfo);

  useEffect(() => {
    refetchUserData();
  }, [refetchUserData]);


  if (userLoading ) return <p>Loading...</p>;
  if (userError) {
    if(userError.message === "Could not verify JWT: JWTExpired") {
      localStorage.removeItem("token")
    }
    console.log(userError.message)
    return <p>Error fetching user data: {userError.message}</p>;
  }
   

  const userInfo = userData.user[0];

  return (
      
    <Container fluid className="p-4" style={{ backgroundColor: '#1a1a1a' }} >
    
    <Row className="mb-4" >
      <Col md={8} >
        <h1 className="mb-3 text-light">Welcome, {userInfo.login}</h1>
        <p className="text-light">Fullname: {userInfo.firstName} {userInfo.lastName}</p>
        
        <p className="text-light">Email: {userInfo.email}</p>
      </Col>
      <Col md={4} className="text-right d-flex justify-content-end align-items-center">
        <Button variant="outline-light" onClick={onLogout}>Logout</Button>
      </Col>
    </Row>
  
    <Row className="mb-4">
      <Col md={4} >
        <Card className="h-100 shadow-sm bg-dark text-light">
          <Card.Header as="h5" className="bg-secondary">Audit Performance</Card.Header>
          <Card.Body className="d-flex justify-content-center align-items-center">
            <AuditGraph />
          </Card.Body>
        </Card>
      </Col>
      <Col md={8}>
        <Card className="h-100 shadow-sm bg-dark text-light">
          <Card.Header as="h5" className="bg-secondary">Piscine Progress</Card.Header>
          <Card.Body className="d-flex justify-content-center align-items-center" > 
            <PiscineGraph   />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  
    <Row className="mb-4">
      <Col md={12}>
        <Card className="shadow-sm bg-dark text-light">
          <Card.Header as="h5" className="bg-secondary">Project XP Overview</Card.Header>
          <Card.Body className="d-flex justify-content-center align-items-center">
            <ProjectXPGraph />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  
    <Row>
      <Col md={12}>
        <Card className="shadow-sm bg-dark text-light">
          <Card.Header as="h5" className="bg-secondary">Project Timeline</Card.Header>
          <Card.Body className="d-flex justify-content-center align-items-center">
            <DatesGraph />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>

  
  );
};

export default Profile;
