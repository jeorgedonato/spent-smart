import React, { useState } from "react";
import {login} from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import "./style.css";

const LoginPage = ({login , isAuthenticated}) => {
  // Setting the component's initial state
  const [loginCred,setLoginCred] = useState({
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
    setLoginCred({...loginCred,[name] : value})
  };

  const handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

      login(loginCred.email, loginCred.password);
      console.log("login clicked")
  };

    if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <p>
          Hello {loginCred.email} {loginCred.password}
        </p>
        <form className="form">
          <input
            value={loginCred.email}
            name="email"
            onChange={handleInputChange}
            type="email"
            placeholder="Email"
          />
          <input
            value={loginCred.password}
            name="password"
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
          />
          <button onClick={handleFormSubmit}>Submit</button>
        </form>
      </div>
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