import React, { useState } from "react";
import { login } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import "./LoginPage.css";


const LoginPage = ({ login, isAuthenticated }) => {
  // Setting the component's initial state
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    if (name === "password") {
      value = value.substring(0, 15);
    }
    // Updating the input's state
    setLoginCred({ ...loginCred, [name]: value })
  };

  const handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    login(loginCred.email, loginCred.password);
    // console.log("login clicked")
  };

  const handleKeyPress = e =>{
    if(e.keyCode === 13){
        login(loginCred.email, loginCred.password);
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <>
            <ContentContainer>
              <h3>Log In</h3>
              <Form onKeyDown={handleKeyPress}>
                <Form.Group >
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="email" onChange={handleInputChange} placeholder="Email Address" />
                </Form.Group>
                <Form.Group >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Password" />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={handleFormSubmit}>Log In</Button>{' '}Don't have an account? <Link to="/register" >Sign Up</Link>
            </ContentContainer>
      </>
    );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);