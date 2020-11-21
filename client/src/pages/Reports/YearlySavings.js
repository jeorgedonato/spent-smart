import React, { useState, useEffect } from "react";
// import ContentContainer from '../../components/ContentContainer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';
import styled from 'styled-components';
import {getYearlySaving} from '../../actions/expenses';
// import moment from 'moment';
import getRandomColor from '../../utils/getRandomColor';


const FlexContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  max-width : 100%;
  padding-top : 15vh;
`;

const YearlySaving = ({getYearlySaving, yearlySavings}) => {

  useEffect(() => {
    getYearlySaving();
  }, [getYearlySaving])
  
  return (
    <>
     
    </>
  );
};

YearlySaving.propTypes = {
  getYearlySaving : PropTypes.func.isRequired,
  // getMonthlyIncomeSum : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // auth : state.auth,
  // expenseMonthlySum : state.expenses.monthlySum,
  yearlySavings : state.expenses.yearlySavings,
})

export default connect(mapStateToProps,{getYearlySaving})(YearlySaving);