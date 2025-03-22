import React from "react";
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
  } = useQuery(UserInfo);


  if (userLoading ) return <p>Loading...</p>;
  if (userError)
    return <p>Error fetching user data: {userError.message}</p>;

  const userInfo = userData.user[0];

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#1a1a1a' , marginTop: '20px',
  marginBottom: '20px' }}>
    <Row className="mb-4">
      <Col md={8}>
        <h1 className="mb-3 text-light">Welcome, {userInfo.login}</h1>
        <p className="text-muted">Email: {userInfo.email}</p>
      </Col>
      <Col md={4} className="text-right d-flex justify-content-end align-items-center">
        <Button variant="outline-light" onClick={onLogout}>Logout</Button>
      </Col>
    </Row>
  
    <Row className="mb-4">
      <Col md={6}>
        <Card className="h-100 shadow-sm bg-dark text-light">
          <Card.Header as="h5" className="bg-secondary">Audit Performance</Card.Header>
          <Card.Body>
            <AuditGraph />
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="h-100 shadow-sm bg-dark text-light">
          <Card.Header as="h5" className="bg-secondary">Piscine Progress</Card.Header>
          <Card.Body>
            <PiscineGraph />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  
    <Row className="mb-4">
      <Col md={12}>
        <Card className="shadow-sm bg-dark text-light">
          <Card.Header as="h5" className="bg-secondary">Project XP Overview</Card.Header>
          <Card.Body>
            <ProjectXPGraph />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  
    <Row>
      <Col md={12}>
        <Card className="shadow-sm bg-dark text-light">
          <Card.Header as="h5" className="bg-secondary">Project Timeline</Card.Header>
          <Card.Body>
            <DatesGraph />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  
  );
};

export default Profile;
