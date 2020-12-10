import React, { useEffect, useState, useRef } from 'react';
import { Table, Modal, Button, Badge, Popover, OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux'
import ContentContainer from '../../components/ContentContainer';
import { getIncomes, deleteIncome, getIncome } from '../../actions/incomes';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import numberWithCommas from '../../utils/numberWithCommas';
import DataTable from 'react-data-table-component';

const FlexContainer = styled.div`
  display: flex;
`;

const AnchorTag = styled(Link)`
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

const Income = ({ getIncomes, deleteIncome, getIncome, incomes: { incomes, loading, income: curIncome }, history, location }) => {

    // const [incomesState, setIncomesState] = useState(incomes);

    useEffect(() => {
        getIncomes();
        return () => {
      getIncomes();
    }
    }, [getIncomes, loading, location]);

    const handleDelete = id => {
        deleteIncome(id);
        setShow(false)
    };

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = id => {
        getIncome(id)
        setShow(true)
    };

  const onClickUpdate = id => {
    return history.push("/incomes/update/" + id);
  }

     const data = incomes.map((income, it) => {
   return {
      id: income._id,
      category : <OverlayTrigger
                      trigger="focus"
                      key={income._id}
                      placement="right"
                      overlay={
                        <Popover id={`popover-positioned-${income._id}`}>
                          <Popover.Title as="h3">Description</Popover.Title>
                          <Popover.Content>
                            {income.description ? income.description : "No description provided"}
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button style={{
                          color: '#212529',
                          backgroundColor: '#e2e6ea',
                          borderColor: '#dae0e5'}}
                      >{income.category_id.name}</Button>
                    </OverlayTrigger>,
      amount : `$ ${numberWithCommas(income.amount)}`,
      created_date : moment(income.created_date).format("MMM DD, YYYY"),
      actions: <span><AnchorTag info onClick={() => {onClickUpdate(income._id)}} ><i className="fa fa-pencil-square" aria-hidden="true"></i></AnchorTag>
                {' '}<AnchorTag onClick={() => handleShow(income._id)}><i className="fa fa-trash" aria-hidden="true"></i></AnchorTag></span>
    }
  });

    return (
        <>
            <ContentContainer>
                <FlexContainer>
                    <h2 style={{ width: '50%' }}>Income</h2>
                    <span style={{ width: '50%', textAlign: "right" }}><AnchorTag info to="/incomes/add"><i className="fa fa-plus-square" aria-hidden="true"></i> Add Income</AnchorTag></span>
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
                    <Modal.Title>Delete Income</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '1.2rem' }}>
                    Do you really want to delete {curIncome && curIncome.hasOwnProperty('name') ? <Badge variant="info">{curIncome.name}</Badge> : ""}?
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: "#117a8b" }} onClick={handleClose}>No</Button>
                    <Button style={{ backgroundColor: "#dc3545" }} onClick={() => handleDelete(curIncome._id)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

Income.propTypes = {
    getIncomes: PropTypes.func.isRequired,
    deleteIncome: PropTypes.func.isRequired,
    getIncome: PropTypes.func.isRequired,
    incomes: PropTypes.object.isRequired,
    // curIncomes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    incomes: state.incomes
});

export default connect(
    mapStateToProps,
    { getIncomes, deleteIncome, getIncome }
)(withRouter(Income));