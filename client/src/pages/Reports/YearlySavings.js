import React, { useState, useEffect } from "react";
// import ContentContainer from '../../components/ContentContainer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';
import styled from 'styled-components';
import { getYearlySaving } from '../../actions/expenses';
// import moment from 'moment';
import getRandomColor from '../../utils/getRandomColor';
import { VictoryLine, VictoryTheme, VictoryChart } from 'victory';


const FlexContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  max-width : 100%;
  padding-top : 15vh;
`;


const YearlySaving = ({ getYearlySaving, yearlySavings }) => {


  useEffect(() => {
    getYearlySaving();
  }, [getYearlySaving])

  return (
    <>
      <ContentContainer>
        <FlexContainer>
          <h3 style={{ width: '100%' }}>Yearly Savings</h3>
        </FlexContainer>
        <VictoryChart  style={{labels : {padding: 100}}}>
          <VictoryLine
          minDomain={{y: -100}}
            labels={yearlySavings ? yearlySavings.map(ys => {return ys.name}) : []}
            data={yearlySavings ? yearlySavings.map(ys => {return ys.amount}) : []}
            width={250}
            height={250}
            style={{
              data: { stroke: "#0cbff3" },
              parent: { border: "1px solid #ccc" },
              labels: {
              fontSize: 6,
              paddingLeft : 100
              }
            }}

          />
          </VictoryChart>
      </ContentContainer>
    </>
  );
};

YearlySaving.propTypes = {
  getYearlySaving: PropTypes.func.isRequired,
  // getMonthlyIncomeSum : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // auth : state.auth,
  // expenseMonthlySum : state.expenses.monthlySum,
  yearlySavings: state.expenses.yearlySavings,
})

export default connect(mapStateToProps, { getYearlySaving })(YearlySaving); 