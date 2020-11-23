import React, { useState, useEffect } from "react";
import Row from "../../components/Row";
import Col from "../../components/Col";
import {Jumbotron} from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import './style.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getMonthlyExpenseSum} from '../../actions/expenses';
import {getMonthlyIncomeSum} from '../../actions/incomes';
import numberWithCommas from '../../utils/numberWithCommas';
// import expenses from "../../reducers/expenses";
import moment from 'moment';
import BarChart from "../../components/BarChart"

function DashAmount(props) {
  return (
    <div>
      <h5>{props.label}</h5>
      <h3 style={props.style}>{props.amount ? "$" : ""}{props.amount}</h3>
    </div>
  );
}
  
function Dashboard({auth : {user}, getMonthlyExpenseSum , getMonthlyIncomeSum, expenseMonthlySum, incomeMonthlySum}) {
  const savings = incomeMonthlySum - expenseMonthlySum;

  useEffect(() => {
    const [month, year] = moment().format("M/YYYY").split("/");
    getMonthlyExpenseSum(month,year);
    getMonthlyIncomeSum(month,year);
  }, [getMonthlyExpenseSum, getMonthlyIncomeSum])

  return (
    <div>
      {/* <ContentContainer style={{textAlign: "center"}}> */}
        <Jumbotron className="jumbo">
            <h1>Welcome to $pent $mart</h1>
            <p style={{fontSize: "1.3rem"}}>Hello, {user ? user.firstname : ""} {user ? user.lastname : ""}</p>
        </Jumbotron>
        <Row style={{textAlign: "center"}}>
          <Col size="md-4">
            <DashAmount style={{color: "green"}} label={"Monthly Income Amount"} amount={incomeMonthlySum ? numberWithCommas(incomeMonthlySum) : ""} />
          </Col>
          <Col size="md-4">
            <DashAmount style={{color: "red"}} label={"Monthly Expenses Amount"} amount={expenseMonthlySum ? numberWithCommas(expenseMonthlySum) : ""} />
          </Col>
          <Col size="md-4">
            <DashAmount style={{color: "blue"}} label={"Monthly Savings Amount"} amount={savings ? numberWithCommas(savings) : ""} />
          </Col>
        </Row>
        {/* <Chart savings={savings} expenses={expenses}/> */}
        {/* <PieChart expenses={expenseMonthlySum} savings={savings} /> */}
        {/* <LineChart income={incomeMonthlySum} expenses={expenseMonthlySum} savings={savings} /> */}
        <BarChart className="barchart" income={incomeMonthlySum} expenses={expenseMonthlySum} savings={savings} />
    </div>
  );
}

Dashboard.propTypes = {
  auth : PropTypes.object.isRequired,
  getMonthlyExpenseSum : PropTypes.func.isRequired,
  getMonthlyIncomeSum : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth : state.auth,
  expenseMonthlySum : state.expenses.monthlySum,
  incomeMonthlySum : state.incomes.monthlySum,
})

export default connect(mapStateToProps,{getMonthlyExpenseSum, getMonthlyIncomeSum})(Dashboard);