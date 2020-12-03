import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const DashboardCalendar = () => {
    return (
        <>
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
        </>
    );
};


export default DashboardCalendar;