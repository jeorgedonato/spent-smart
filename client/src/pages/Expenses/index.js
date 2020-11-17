import React, {useEffect} from 'react';
import { Table, Container } from 'react-bootstrap';
import { styled } from 'styled-components';
import {connect} from 'react-redux'
import ContentContainer from '../../components/ContentContainer';
import {getExpenses} from '../../actions/expenses';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';


const Expense = ({getExpenses, expenses : {expenses, loading}}) => {

  useEffect(() => {
    getExpenses();
  },[getExpenses])

  return (
    <>
      <ContentContainer>
        <h2>Expenses</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {/* {console.log(expenses)} */}
          {expenses.map(expense => {
            // {console.log(expense)}
            return (
            <tr key={expense._id}>
              <td>{expense.name}</td>
              <td>{expense.category_id.name}</td>
              <td>$ {expense.amount}</td>
              <td>{expense.hasOwnProperty('due_date') ? <Moment>expense.due_date</Moment> : "Not Provided"}</td>
              <td>{moment(expense.created_date).format("MMM DD, YYYY")}</td>
            <td><i className="fa fa-pencil-square" aria-hidden="true"></i>{' '}<i class="fa fa-trash" aria-hidden="true"></i></td>
            </tr>
            );
          })}
          </tbody>
        </Table>
      </ContentContainer>
    </>
  )
};

Expense.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expenses: state.expenses
});

export default connect(
  mapStateToProps,
  { getExpenses }
)(Expense);