import React, { useState, useEffect } from "react";
// import ContentContainer from '../../components/ContentContainer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';
import styled from 'styled-components';
import {getMonthlyExpenseCategorySum} from '../../actions/expenses';
import moment from 'moment';
import getRandomColor from '../../utils/getRandomColor';


const FlexContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  max-width : 100%;
  padding-top : 2vh;
`;

const Reports = ({getMonthlyExpenseCategorySum, categoryExpenses}) => {

  useEffect(() => {
    const [month, year] = moment().format("M/YYYY").split("/");
    getMonthlyExpenseCategorySum(month,year);
  }, [getMonthlyExpenseCategorySum])
  
  return (
    <>
      <ContentContainer>
        <FlexContainer>
          <h3 style={{ width: '100%' }}>Monthly Expense by Categories</h3>
          {/* <AnchorTag info style={{ width: '50%', textAlign: "right" }} href="/expenses/add"><i className="fa fa-plus-square" aria-hidden="true"></i> Add Expense</AnchorTag> */}
        </FlexContainer>
        <VictoryPie
          labels={categoryExpenses ? categoryExpenses.map(ce => {return ce.category[0].name}) : []}
          data={categoryExpenses ? categoryExpenses.map(ce => {return parseInt(ce.amount)}) : []}
          colorScale={categoryExpenses ? categoryExpenses.map(ce => {return getRandomColor()}) : []}
          width={250}
          height={250}
          style={{
            parent: {
              marginTop: -140,
              marginBottom : -140
              // padding: -200,

            },
            labels: {
              fontSize: 4,
              padding: 10
              // fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
            }
          }}
              events={[{
      target: "data",
      eventHandlers: {
        onClick: () => {
          // console.log(data)
          return [
            {
              target: "data",
              mutation: ({style}) => {
                // console.log(data)
                return style.fill === "#d52a49" ? null : { style: { fill: "#d52a49" } };
              }
            }, {
              target: "labels",
              mutation: ({slice,text}) => {
                return text === `$ ${slice.value}` ? null : { text: `$ ${slice.value}` };
              }
            }
          ];
        }
      }
    }]}
          // animate={{ duration: 1500 }}
          // padding={{top:0,bottom:0,left:0,right:0}}
          />
      </ContentContainer>
    </>
  );
};

Reports.propTypes = {
  getMonthlyExpenseCategorySum : PropTypes.func.isRequired,
  // getMonthlyIncomeSum : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // auth : state.auth,
  // expenseMonthlySum : state.expenses.monthlySum,
  categoryExpenses : state.expenses.categoryExpenses,
})

export default connect(mapStateToProps,{getMonthlyExpenseCategorySum})(Reports);