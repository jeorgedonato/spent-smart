import React, { useState } from "react";
import Row from "../../components/Row";
import Col from "../../components/Col";
import {Jumbotron} from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import './style.css';


function DashIncome(props) {
  return (
    <div>
      <h5>Monthly Income Amount:</h5>
      <h3 style={{color: "green"}}>${props.income}</h3>
    </div>
  );
}

function DashExpenses(props) {
  return (
    <div>
      <h5>Monthly Expenses Amount:</h5>
      <h3 style={{color: "red"}}>${props.expenses}</h3>
    </div>
  );
}

function DashSavings(props) {
  return (
    <div>
      <h5>Monthly Savings Amount:</h5>
      <h3 style={{color: "blue"}}>${props.savings}</h3>
    </div>
  );
}
  
function Dashboard() {
  const income = 1000;
  const expenses = 800;
  const savings = 200;

  return (
    <div>
      <ContentContainer style={{textAlign: "center"}}>
        <Jumbotron className="jumbo">
            <h1>Welcome to $pent $mart</h1>
        </Jumbotron>
        <Row>
          <Col size="md-4">
            <DashIncome income={income} />
          </Col>
          <Col size="md-4">
            <DashExpenses expenses={expenses} />
          </Col>
          <Col size="md-4">
            <DashSavings savings={savings} />
          </Col>
        </Row>
      </ContentContainer>
    </div>
  );
}

export default Dashboard;