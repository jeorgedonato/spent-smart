import React, { useState } from "react";
import Row from "../../components/Row";
import Col from "../../components/Col";
import {Jumbotron} from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import './style.css';


function Dashboard() {
  return (
    <div>
      <ContentContainer style={{textAlign: "center"}}>
        <Jumbotron className="jumbo">
            <h1>Welcome to $pent $mart</h1>
        </Jumbotron>
        <Row>
          <Col size="md-4">
            <h5>Monthly Income Amount:</h5>
            <h3 style={{color: "green"}}>$1,000</h3>
          </Col>
          <Col size="md-4">
            <h5>Monthly Expense Amount:</h5>
            <h3 style={{color: "red"}}>$800</h3>
          </Col>
          <Col size="md-4">
            <h5>Monthly Savings Amount:</h5>
            <h3 style={{color: "blue"}}>$200</h3>
          </Col>
        </Row>
      </ContentContainer>
    </div>
  );
}

export default Dashboard;