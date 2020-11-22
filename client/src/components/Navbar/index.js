import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./style.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
// import Listlinks from '../ListLinks';
// import Banner from "../img/"

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar({ auth: { isAuthenticated, loading }, logout }) {

  const ulNav = useRef(null);
  const navRef = useRef(null);
  const burgerNav = useRef(null);
  let initialNavClass = ["nav-links"];
  const [navClass, setNavClass] = useState("nav-active");
  const [navClassNames, setNavClassNames] = useState(initialNavClass);
  // const [scrollVert,setScrollVert] = useState(null);

  // const scrollCheck = () => {
  //   if(window.scrollY < 100){
  //    navRef.current.classList.toggle("transparent-nav");
  //   }
  // };

  const navSlide = (e) => {
    setNavClass(!navClass ? "nav-active nav-links-active" : "");
    setNavClassNames([...initialNavClass, navClass]);
    ulNav.current.classList.toggle("asasd")
    // console.log(ulNav.current.classList)
    const navLinks = ulNav.current.children;

    let navI = 0;
    for (let nl of navLinks) {
      if (nl.style.animation) {
        nl.style.animation = "";
      } else {
        nl.style.animation = `navLinkFade 0.5s ease forwards ${navI / 7 + .5}s`;
      }
      navI++;
    }
    //Burger animation
    e.currentTarget.classList.toggle("toggle");
    // if( navRef.current.classList.contains("transparent-nav")){
    // console.log(navRef.current.classList)
    // scrollCheck();
    // }
  };
  
  return (
    <nav ref={navRef}>
      <div className="logo">
        <h4>$pent $mart</h4>
        <img src="/favicon.png" alt="spent-smart" class="responsive"></img>
      </div>
      <ul className={navClassNames.join(" ")} ref={ulNav}>
        <li><Link to="/">Home</Link></li>
        
        {isAuthenticated ?
          [
            <li key="0"><Link to="/expenses">Expenses</Link></li>,
            <li key="1"><Link to="/incomes">Income</Link></li>,
            <li key="3"><Link to="/reports">Reports</Link></li>,
            <li key="2"><Link to="" onClick={logout}>Logout</Link></li>
          ] :
          [
            // <li key="0"><Link to="/about">About</Link></li>,
            <li key="1"><Link to="/login">Log In</Link></li>,
            <li key="2"><Link to="/register">Sign Up</Link></li>
          ]
        }
      </ul>
      <div className="burger" onClick={e => navSlide(e)} ref={burgerNav}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
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
