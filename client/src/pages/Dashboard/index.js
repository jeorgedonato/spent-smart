import React, { useState } from "react";
import Row from "../../components/Row";
import Col from "../../components/Col";
import {Jumbotron} from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import Chart from "../../components/Chart"
import './style.css';

function DashAmount(props) {
  return (
    <div>
      <h5>{props.label}</h5>
      <h3 style={props.style}>${props.amount}</h3>
    </div>
  );
}
  
function Dashboard() {
  const income = 1000;
  const expenses = 600;
  const savings = income - expenses;

  return (
    <div>
      <ContentContainer style={{textAlign: "center"}}>
        <Jumbotron className="jumbo">
            <h1>Welcome to $pent $mart</h1>
        </Jumbotron>
        <Row>
          <Col size="md-4">
            <DashAmount style={{color: "green"}} label={"Monthly Income Amount"} amount={income} />
          </Col>
          <Col size="md-4">
            <DashAmount style={{color: "red"}} label={"Monthly Expenses Amount"} amount={expenses} />
          </Col>
          <Col size="md-4">
            <DashAmount style={{color: "blue"}} label={"Monthly Savings Amount"} amount={savings} />
          </Col>
        </Row>
        <Chart savings={savings} expenses={expenses}/>
      </ContentContainer>
    </div>
  );
}

export default Dashboard;