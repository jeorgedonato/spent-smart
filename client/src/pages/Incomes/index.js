import React, { useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { styled } from 'styled-components';
import { connect } from 'react-redux'
import ContentContainer from '../../components/ContentContainer';
import { getIncomes } from '../../actions/incomes';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';


const Income = ({ getIncomes, incomes: { incomes, loading } }) => {

    useEffect(() => {
        getIncomes();
    }, [getIncomes])

    return (
        <>
            <ContentContainer>
                <h2>Incomes</h2>
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

Income.propTypes = {
    getIncomes: PropTypes.func.isRequired,
    incomes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    incomes: state.incomes
});

export default connect(
    mapStateToProps,
    { getIncomes }
)(Income);