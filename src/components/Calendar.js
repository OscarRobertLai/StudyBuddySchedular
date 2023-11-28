// CalendarComponent.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Localizer for calendar
const localizer = momentLocalizer(moment);

function convertToDate(str) {
    // Extract components from the string
    const year = parseInt(str.substring(0, 4), 10);
    const month = parseInt(str.substring(4, 6), 10) - 1; // Month is 0-indexed in JavaScript
    const day = parseInt(str.substring(6, 8), 10);
    const hours = parseInt(str.substring(9, 11), 10);
    const minutes = parseInt(str.substring(11, 13), 10);
    const seconds = parseInt(str.substring(13, 15), 10);

    // Construct the Date object
    return new Date(year, month, day, hours, minutes, seconds);
}

const getEventsList = ( {events, uniqueEvents} ) => {
    const eventsArray = []
    events.forEach(singleEvent => {
        const dtStartValue = convertToDate(singleEvent["DTSTART;TZID=Australia/Melbourne"]);
        const dtEndValue = convertToDate(singleEvent["DTEND;TZID=Australia/Melbourne"]);

        eventsArray.push({
            title: singleEvent.DESCRIPTION,
            start: dtStartValue,
            end: dtEndValue
        })
    });
    // console.log("TESTING", eventsArray)
    return eventsArray
}

const CalendarComponent = ({ events, uniqueEvents }) => {
    return (
        <div style={{ height: '700px' }}>
            <Calendar
                localizer={localizer}
                events={getEventsList({events, uniqueEvents})}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                onSelectSlot={(slotInfo) => {
                    console.log(slotInfo)
                }}
            />
        </div>
    );
}

export default CalendarComponent;
