import React,{useEffect} from 'react'
import {useParams, Redirect} from "react-router-dom";
import {setAlert} from '../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Jumbotron} from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import {confirm} from '../../actions/auth'

export const Confirm = ({  isAuthenticated ,confirm, setAlert}) => {
  const {id} = useParams();

  useEffect(() => {
      confirm(id);
      // <Redirect to="/dashboard" />
  },[]);


  // console.log(id)
  return (
    <div>
      <ContentContainer>
        <Jumbotron style={{textAlign: "center"}}>
          <h3>Welcome to $pent $mart</h3>
          <p >
            Thank you for choosing our app!
          </p>
        </Jumbotron>
      </ContentContainer>
    </div>
  )
};

//Assigning Proptypes for linting
Confirm.propTypes = {
  setAlert : PropTypes.func.isRequired,
  confirm : PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

//Getting state from store and use it for component prop consuming
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
});

//Exporting and connecting to our store
export default connect(
  mapStateToProps,
  { setAlert ,confirm}
)(Confirm);
