import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Badge, Popover, OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux'
import ContentContainer from '../../components/ContentContainer';
import { getExpenses, deleteExpense, getExpense } from '../../actions/expenses';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import numberWithCommas from '../../utils/numberWithCommas';

const FlexContainer = styled.div`
  display: flex;
`;

const AnchorTag = styled.a`
  color : ${props => props.info ? "#117a8b" : "#dc3545"};
  &:hover {
    text-decoration : none;
    color :  ${props => props.info ? "#117a8b" : "#dc3545"};
  }
  font-size : 1.5rem;
  @media (max-width: 768px){
    font-size : 1rem;
    margin-top: 15px
  }
`;

const CenteredTd = styled.td`
  text-align: center;
`;



const Expense = ({ getExpenses, deleteExpense, getExpense, expenses: { expenses, loading, expense: curExpense } }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = id => {
    getExpense(id)
    setShow(true)
  };
  // console.log(curExpense)
  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const handleDelete = id => {
    deleteExpense(id);
    setShow(false)
  };

  return (
    <>
      <ContentContainer>
        <FlexContainer>
          <h2 style={{ width: '50%' }}>Expenses</h2>
          <AnchorTag info style={{ width: '50%', textAlign: "right" }} href="/expenses/add"><i className="fa fa-plus-square" aria-hidden="true"></i> Add Expense</AnchorTag>
        </FlexContainer>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {/* <th>Name</th> */}
              <th>Category</th>
              <th>Amount</th>
              {/* <th>Due Date</th> */}
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(expenses)} */}
            {expenses.map((expense, it) => {
              // {console.log(expense)}
              return (
                <tr key={expense._id}>
                  {/* <td>{expense.name}</td> */}
                  <td>
                    <OverlayTrigger
                      trigger="focus"
                      key={expense._id}
                      placement="right"
                      overlay={
                        <Popover id={`popover-positioned-${expense._id}`}>
                          <Popover.Title as="h3">Description</Popover.Title>
                          <Popover.Content>
                            {expense.description}
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button style={{
                          color: '#212529',
                          backgroundColor: '#e2e6ea',
                          borderColor: '#dae0e5'}}
                      >{expense.category_id.name}</Button>
                    </OverlayTrigger>
                  </td>
                  <td>$ {numberWithCommas(expense.amount)}</td>
                  {/* <td>{expense.hasOwnProperty('due_date') ? <Moment>expense.due_date</Moment> : "Not Provided"}</td> */}
                  <td>{moment(expense.created_date).format("MMM DD, YYYY")}</td>
                  <CenteredTd>
                    <AnchorTag info href={"/expenses/update/" + expense._id} ><i className="fa fa-pencil-square" aria-hidden="true"></i></AnchorTag>{' '}
                    <AnchorTag onClick={() => handleShow(expense._id)}><i className="fa fa-trash" aria-hidden="true"></i></AnchorTag>
                  </CenteredTd>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ContentContainer>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ top: '30%' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '1.2rem' }}>
          Do you really want to delete {curExpense && curExpense.hasOwnProperty('name') ? <Badge variant="info">{curExpense.name}</Badge> : ""}?
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#117a8b" }} onClick={handleClose}>No</Button>
          <Button style={{ backgroundColor: "#dc3545" }} onClick={() => handleDelete(curExpense._id)}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

Expense.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  getExpense: PropTypes.func.isRequired,
  expenses: PropTypes.object.isRequired,
  // curExpense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expenses: state.expenses
});

export default connect(
  mapStateToProps,
  { getExpenses, deleteExpense, getExpense }
)(Expense);