import React, { useState } from "react";
import { login } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import "./LoginPage.css";
// import { useForm } from "react-hook-form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// const eye = <FontAwesomeIcon icon={faEye} />;

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

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      login(loginCred.email, loginCred.password);
    }
  }


  const [passwordShown, setPasswordShown] = useState(false);
  const handleTogglePassword = e => {
    setPasswordShown(passwordShown ? false : true);
  };

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
            <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>Password</Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control type={passwordShown ? "text" : "password"} name="password" onChange={handleInputChange} placeholder="Password" />
              <InputGroup.Append>
                <InputGroup.Text>
                  <i onClick={handleTogglePassword}><i className="fa fa-eye" aria-hidden="true"></i></i>
              </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleFormSubmit}>Log In</Button>{' '}<div className="underlogin">Don't have an account? </div> <Link to="/register" >Sign Up</Link>
        
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