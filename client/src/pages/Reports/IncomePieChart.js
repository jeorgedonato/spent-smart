import React, { useState, useEffect } from "react";
// import ContentContainer from '../../components/ContentContainer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';
import styled from 'styled-components';
import {getMonthlyIncomeCategorySum} from '../../actions/incomes';
import moment from 'moment';
import getRandomColor from '../../utils/getRandomColor';


const FlexContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  max-width : 100%;
  padding-top : 15vh;
`;

const IncomePieChart = ({getMonthlyIncomeCategorySum, categoryIncomes}) => {

  useEffect(() => {
    const [month, year] = moment().format("M/YYYY").split("/");
    getMonthlyIncomeCategorySum(month,year);
  }, [getMonthlyIncomeCategorySum])
  
  return (
    <>
      <ContentContainer>
        <FlexContainer>
          <h3 style={{ width: '100%' }}>Monthly Income by Categories</h3>
          {/* <AnchorTag info style={{ width: '50%', textAlign: "right" }} href="/expenses/add"><i className="fa fa-plus-square" aria-hidden="true"></i> Add Expense</AnchorTag> */}
        </FlexContainer>
        <VictoryPie
          labels={categoryIncomes ? categoryIncomes.map(ce => {return ce.category[0].name}) : []}
          data={categoryIncomes ? categoryIncomes.map(ce => {return parseInt(ce.amount)}) : []}
          colorScale={categoryIncomes ? categoryIncomes.map(ce => {return getRandomColor()}) : []}
          width={250}
          height={250}
          style={{
            parent: {
              // marginTop: -140,
              // marginBottom : -140
              position : 'absolute',
              top: '40px',
              right: 0,
              left: 0,
              bottom: 0
              // padding: -200,

            },
            labels: {
              fontSize: 4,
              padding: 5
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
                return style.fill === "#40bf53" ? null : { style: { fill: "#40bf53" } };
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
          />
      </ContentContainer>
    </>
  );
};

IncomePieChart.propTypes = {
  getMonthlyIncomeCategorySum : PropTypes.func.isRequired,
  // getMonthlyIncomeSum : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // auth : state.auth,
  // expenseMonthlySum : state.expenses.monthlySum,
  categoryIncomes : state.incomes.categoryIncomes,
})

export default connect(mapStateToProps,{getMonthlyIncomeCategorySum})(IncomePieChart);