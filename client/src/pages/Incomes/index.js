import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux'
import ContentContainer from '../../components/ContentContainer';
import { getIncomes, deleteIncome, getIncome } from '../../actions/incomes';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

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


const Income = ({ getIncomes, deleteIncome, getIncome, incomes: { incomes, loading, income: curIncome } }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = id => {
        getIncome(id)
        setShow(true)
    };
    // console.log(curIncome)
    useEffect(() => {
        getIncomes();
    }, [getIncomes]);

    const handleDelete = id => {
        deleteIncome(id);
        setShow(false)
    };

    return (
        <>
            <ContentContainer>
                <FlexContainer>
                    <h2 style={{ width: '50%' }}>Incomes</h2>
                    <AnchorTag info style={{ width: '50%', textAlign: "right" }} href="/imcomes/add"><i className="fa fa-plus-square" aria-hidden="true"></i> Add Income</AnchorTag>
                </FlexContainer>
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
                        {/* {console.log(incomes)} */}
                        {incomes.map(income => {
                            // {console.log(income)}
                            return (
                                <tr key={income._id}>
                                    <td>{income.name}</td>
                                    <td>{income.category_id.name}</td>
                                    <td>$ {income.amount}</td>
                                    <td>{income.hasOwnProperty('due_date') ? <Moment>income.due_date</Moment> : "Not Provided"}</td>
                                    <td>{moment(income.created_date).format("MMM DD, YYYY")}</td>
                                    <CenteredTd>
                                        <AnchorTag info><i className="fa fa-pencil-square" aria-hidden="true"></i></AnchorTag>{' '}
                                        <AnchorTag onClick={() => handleShow(income._id)}><i className="fa fa-trash" aria-hidden="true"></i></AnchorTag>
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
                    <Modal.Title>Delete Income</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '1.2rem' }}>
                    Do you really want to delete {curIncome && curIncome.hasOwnProperty('name') ? <Badge variant="info">{curIncome.name}</Badge> : ""}
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
)(Income);