import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/categories';
import { updateExpense, getExpense } from '../../actions/expenses';
import { setAlert } from '../../actions/alert';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import {getMonthlyExpenseSum} from '../../actions/expenses';
import moment from 'moment';


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

const Update = ({ getCategories, getExpense, setAlert, updateExpense, categories: { categories }, expense, match, loading ,getMonthlyExpenseSum, expenseMonthlySum }) => {

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    amount: ""
  });

  useEffect(() => {
    // if(!loading){
    getCategories("Expense");
    getExpense(match.params.id);
    setFormData({ ...formData, ["description"]: expense ? expense.description : "", ["amount"]: expense ? expense.amount : "", ["category"]: expense ? expense.category_id.name : "" });
    const [month, year] = moment().format("M/YYYY").split("/");
    getMonthlyExpenseSum(month,year);
    // }
  }, [loading]);

  const { category, description, amount } = formData;

  const handleSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      setFormData({ ...formData, ["category"]: newValue.value });
    } else if (actionMeta.action === "create-option") {
      setFormData({ ...formData, ["category"]: newValue.value });
    } else {
      setFormData({ ...formData, ["category"]: "" });
    }

  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(formData)
    if (category && amount) {
      updateExpense(match.params.id, formData);
      <Redirect to="/expense" />
    } else {
      setAlert("Category and Amount fields are required", "danger");
    }
  }
  // setCatArr(categories.map(c => {return {value : c.name, label : c.name}}))


  return (
    <>
      <ContentContainer>
        <FlexContainer>
          <h3 style={{ width: '50%' }}><i className="fa fa-pencil-square" aria-hidden="true"></i>{' '}Update Expense</h3>
          <span style={{ width: '50%', textAlign: "right" }}><AnchorTag info to="/expenses"><i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back</AnchorTag></span>
        </FlexContainer>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="categoryInput">
            <Form.Label>Category</Form.Label>
            <CreatableSelect
              isClearable
              options={categories.map(c => { return { value: c.name, label: c.name } })}
              onChange={handleSelectChange}
              value={{ value: category, label: category }}
            />
          </Form.Group>
          <Form.Group controlId="amountInput">
            <Form.Label>Amount</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="number" value={amount} placeholder="Amount" onChange={e => setFormData({ ...formData, ["amount"]: e.target.value })} />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="descriptionInput">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={e => setFormData({ ...formData, ["description"]: e.target.value })} />
          </Form.Group>
          <Button type="submit" style={{ backgroundColor: "#28a745" }}><i className="fa fa-pencil" aria-hidden="true"></i> Update</Button>
        </Form>

      </ContentContainer>
    </>
  )
};


Update.propTypes = {
  getCategories: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  getExpense: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  getMonthlyExpenseSum: PropTypes.object.isRequired,
  user : PropTypes.object.isRequired
  // loading: PropTypes.object.isRequired,
  // expense: PropTypes.object.isRequired,

  // curExpense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories,
  expense: state.expenses.expense,
  loading: state.expenses.loading,
  expenseMonthlySum : state.expenses.monthlySum,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getCategories, updateExpense, setAlert, getExpense, getMonthlyExpenseSum }
)(Update);