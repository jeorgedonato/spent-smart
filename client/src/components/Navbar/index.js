import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logout} from '../../actions/auth';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar({ auth: { isAuthenticated, loading }, logout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Spent Smart
      </Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/" || window.location.pathname === "/about"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/discover"
              className={window.location.pathname === "/discover" ? "nav-link active" : "nav-link"}
            >
              Discover
            </Link>
          </li>
          {isAuthenticated ?  <li className="nav-item">
              <a
                onClick={logout} 
                href='#!'
                // to="/search"
              >
                Logout
              </a>
            </li>
           : ""}
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
