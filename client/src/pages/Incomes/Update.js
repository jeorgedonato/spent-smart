import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getCategories} from '../../actions/categories';
import { updateIncome ,getIncome } from '../../actions/incomes';
import {setAlert} from '../../actions/alert';
import styled from 'styled-components';
import {Link, useHistory, withRouter} from 'react-router-dom';
import usePrevious from '../../utils/usePrevious';

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

const Update = ({incomes: {income , loading} , getCategories, getIncome, setAlert, updateIncome, categories : {categories } , match , history}) => {

  const [formData, setFormData] = useState({
    id: "",
    category : "",
    description: "",
    amount: ""
  });

  // const prevIncome = usePrevious(income)

  useEffect(() => {
    if(income === null || 
        id === "" || 
        id !== income._id || 
        description !== income.description || 
        amount !== income.amount || 
        category !== income.category_id.name){
      getIncome(match.params.id);
      setFormData({
       id : loading || !income ? "" : income._id, 
       description : loading || !income ? "" : income.description, 
       amount : loading || !income ? "" : income.amount, 
       category: loading || !income ? "" : income.category_id.name
      });
    }
  }, [getIncome, match.params.id, income]);

 useEffect(() => {
    getCategories("Income");
  },[getCategories])

    const {id,category,description,amount} = formData;

  const handleSelectChange = (newValue, actionMeta) => {
    if(actionMeta.action === "select-option"){
      setFormData({...formData, ["category"] : newValue.value});
       
    }else if(actionMeta.action === "create-option"){
      setFormData({...formData, ["category"] : newValue.value});
    }else{
      setFormData({...formData, ["category"] : ""});
    }
     
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(formData)
    if(category && amount){
      updateIncome(match.params.id, formData);
      history.push('/incomes');
    }else{
      setAlert("Category and Amount fields are required","danger");
    }
  }
  // setCatArr(categories.map(c => {return {value : c.name, label : c.name}}))

  return (
    <>
      <ContentContainer>
        <FlexContainer>
          <h3 style={{width: '50%'}}><i className="fa fa-pencil-square" aria-hidden="true"></i>{' '}Update Income</h3>
          <span style={{ width: '50%', textAlign: "right" }}><AnchorTag info to="/incomes"><i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back</AnchorTag></span>
        </FlexContainer>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="categoryInput">
            <Form.Label>Category</Form.Label>
             <CreatableSelect 
              isClearable 
              options={categories.map(c => {return {value : c.name, label : c.name}})}
              onChange={handleSelectChange}
              value={{value: category,label : category}}
              />
        </Form.Group>
        <Form.Group controlId="amountInput">
          <Form.Label>Amount</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="number" value={amount} placeholder="Amount" onChange={e => setFormData({...formData,["amount"]: e.target.value})}/>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="descriptionInput">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={e => setFormData({...formData,["description"]: e.target.value})} />
        </Form.Group>
        <Button type="submit" style={{backgroundColor : "#28a745"}}><i className="fa fa-pencil" aria-hidden="true"></i> Update</Button>
        </Form>
        
      </ContentContainer>
    </>
  )
};


Update.propTypes = {
  getCategories: PropTypes.func.isRequired,
  updateIncome: PropTypes.func.isRequired,
  getIncome: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  incomes : PropTypes.object.isRequired
  // income: PropTypes.object.isRequired,

  // curIncome: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  incomes : state.incomes,
  categories: state.categories,
});

export default connect(
  mapStateToProps,
  { getCategories, updateIncome, setAlert, getIncome }
)(withRouter(Update));