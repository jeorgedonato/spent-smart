import React, { useEffect, useState } from 'react';
import { Modal, Button, Badge, Popover, OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux'
import ContentContainer from '../../components/ContentContainer';
import { getExpenses, deleteExpense, getExpense } from '../../actions/expenses';
import PropTypes from 'prop-types';
import moment from 'moment';
import numberWithCommas from '../../utils/numberWithCommas';
import DataTable from 'react-data-table-component';

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

const customStyle = {
  cells : {
    style : {
      fontSize: '1.2rem'
    }
  },
  pagination : {
    style : {
      zIndex : 0
    }
  },
  headCells: {
    style: {
      fontSize: '1.2rem',
    },
  }
};

const columns = [
  {
    name: 'Category',
    // sortable: true,
    selector: 'category'
  },
  {
    name: 'Amount',
    sortable: true,
    selector: 'amount'
  },
  {
    name: 'Created Date',
    sortable: true,
    selector: 'created_date'
  },
  {
    name: 'Actions',
    // sortable: true,
    selector: 'actions'
  },
];

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

  const data = expenses.map((expense, it) => {
   return {
      id: expense._id,
      category : <OverlayTrigger
                      trigger="focus"
                      key={expense._id}
                      placement="right"
                      overlay={
                        <Popover id={`popover-positioned-${expense._id}`}>
                          <Popover.Title as="h3">Description</Popover.Title>
                          <Popover.Content>
                            {expense.description ? expense.description : "No description provided"}
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button style={{
                          color: '#212529',
                          backgroundColor: '#e2e6ea',
                          borderColor: '#dae0e5'}}
                      >{expense.category_id.name}</Button>
                    </OverlayTrigger>,
      amount : `$ ${numberWithCommas(expense.amount)}`,
      created_date : moment(expense.created_date).format("MMM DD, YYYY"),
      actions: <span><AnchorTag info href={"/expenses/update/" + expense._id} ><i className="fa fa-pencil-square" aria-hidden="true"></i></AnchorTag>
                {' '}<AnchorTag onClick={() => handleShow(expense._id)}><i className="fa fa-trash" aria-hidden="true"></i></AnchorTag></span>
    }
  });
  // console.log(data)

  return (
    <>
      <ContentContainer>
        <FlexContainer>
          <h2 style={{ width: '50%' }}>Expenses</h2>
          <AnchorTag info style={{ width: '50%', textAlign: "right" }} href="/expenses/add"><i className="fa fa-plus-square" aria-hidden="true"></i> Add Expense</AnchorTag>
        </FlexContainer>
        <DataTable columns={columns} data={data} striped={true} pagination={true} noHeader={true} customStyles={customStyle} />
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