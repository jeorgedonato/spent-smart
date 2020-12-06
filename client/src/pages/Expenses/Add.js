import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button, Modal } from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories, addCategory } from '../../actions/categories';
import { addExpense } from '../../actions/expenses';
import { setAlert } from '../../actions/alert';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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


const Add = ({ getCategories, setAlert, addExpense, addCategory, categories: { categories } }) => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    amount: ""
  });

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

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true)
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(formData)
    if (category && amount) {
      addExpense(formData);
    } else {
      setAlert("Category and Amount fields are required", "danger");
    }
  }

  useEffect(() => {
    getCategories("Expense");
  }, [getCategories]);

  return (
    <>
      <ContentContainer>
        <FlexContainer>
          <h3 style={{ width: '50%' }}><i className="fa fa-plus-square" aria-hidden="true"></i>{' '}Add Expense</h3>
          <span style={{ width: '50%', textAlign: "right" }}><AnchorTag info to="/expenses"><i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back</AnchorTag></span>
        </FlexContainer>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="categoryInput">
            <Form.Label>
              Category
          </Form.Label>
            <CreatableSelect
              isClearable
              options={categories.map(c => { return { value: c.name, label: c.name } })}
              onChange={handleSelectChange}
            />
          </Form.Group>
          <Form.Group controlId="amountInput">
            <Form.Label>Amount</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="number" placeholder="Amount" onChange={e => setFormData({ ...formData, ["amount"]: e.target.value })} />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="descriptionInput">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={e => setFormData({ ...formData, ["description"]: e.target.value })} />
          </Form.Group>
          <Button type="submit" style={{ backgroundColor: "#28a745" }}><i className="fa fa-plus" aria-hidden="true"></i> Add</Button>
        </Form>
      </ContentContainer>
    </>
  )
};

Add.propTypes = {
  getCategories: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  // curExpense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { getCategories, addExpense, setAlert, addCategory }
)(Add);