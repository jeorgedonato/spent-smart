import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getIncomes} from '../../actions/incomes';
import {getExpenses} from '../../actions/expenses';
import moment from 'moment';


const DashboardCalendar = ({incomes, expenses , getExpenses, getIncomes}) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getIncomes()
    getExpenses()
    expenses.map(expenses => {
      renderEventContent(expenses)
    })

  },[getExpenses,getIncomes])

  const handleDateClick = arg => {
    console.log(arg);
  }
    return (
        <>
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
        </>
    );
};

DashboardCalendar.propTypes = {
  incomes: PropTypes.array.isRequired,
  expenses: PropTypes.array.isRequired,
  getExpenses : PropTypes.func.isRequired,
  getIncomes : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  incomes: state.incomes.incomes,
  expenses: state.expenses.expenses,
})


export default connect(mapStateToProps,{getExpenses, getIncomes})(DashboardCalendar);