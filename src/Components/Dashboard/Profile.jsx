import React, { useEffect } from "react";
import { AuditGraph } from "../Graphs/AuditGraph";
import ProjectXPGraph from "../Graphs/ProjectXPGraph";
import PiscineGraph from "../Graphs/PiscineGraph";
import DatesGraph from "../Graphs/DatesProjectGraph";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { UserInfo } from "../Queries/Query";
import { useQuery } from "@apollo/client";
import "../Dashboard/Profile.css";

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

  if (userLoading) return <p>Loading...</p>;
  if (userError) {
    if (userError.message === "Could not verify JWT: JWTExpired") {
      localStorage.removeItem("token");
    }
    console.log(userError.message);
    return <p>Error fetching user data: {userError.message}</p>;
  }

  const userInfo = userData.user[0];

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#1a1a1a" }}>
      <Row className="mb-4">
        <Col md={12}>
          <div className="p-4 rounded shadow d-flex flex-column justify-content-between chalkboard">
            <div>
              <h1 className="mb-3 chalkboardtext">Welcome, {userInfo.login}</h1>
              <p className="chalkboardtext">
                <p>
                  Fullname: {userInfo.firstName} {userInfo.lastName}
                </p>
              </p>
              <p className="chalkboardtext">
                <p> Email: {userInfo.email}</p>
              </p>
            </div>

            <div className="d-flex justify-content-end ">
              <Button
                variant="light"
                className="fw-bold chalkboardtext"
                onClick={onLogout}
                style={{
                  color: "#2e4d2c",
                  fontFamily: '"Patrick Hand", cursive',
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm bg-dark text-light chalkboard">
            <Card.Header as="h5" className="bg-secondary chalkboardheader" >
              Audit Performance
            </Card.Header>
            <Card.Body className="d-flex justify-content-center align-items-center">
              <AuditGraph />
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="h-100 shadow-sm bg-dark text-light chalkboard">
            <Card.Header as="h5" className="bg-secondary chalkboardheader">
              Piscine Progress
            </Card.Header>
            <Card.Body className="d-flex justify-content-center align-items-center">
              <PiscineGraph />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm bg-dark text-light chalkboard">
            <Card.Header as="h5" className="bg-secondary chalkboardheader">
              Project XP Overview
            </Card.Header>
            <Card.Body className="d-flex justify-content-center align-items-center">
              <ProjectXPGraph />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm bg-dark text-light chalkboard">
            <Card.Header as="h5" className="bg-secondary chalkboardheader">
              Project Timeline
            </Card.Header>
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
