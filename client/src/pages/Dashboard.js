import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";


function Dashboard() {
  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: 30 }}>
        <Row>
          <Col size="md-12">
            <h1>Welcome To $pent $mart!</h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <h3>Your current daily income amount is:</h3>
            <h3>Your current daily expense amount is:</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;