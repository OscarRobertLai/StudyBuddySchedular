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
        // console.log("SINGLE EVENT", singleEvent)
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

const CalendarComponent = ({ events, uniqueEvents, selected, setSelected}) => {

     const handleSlotSelection = ({ start, end, action }) => 
     {
        switch (action) {
            case "click":
                console.log("CLICKED", start.getDate(), end.getDate())
                break;
            case "select":
                console.log("SELECTED", start.getDate(), end.getDate(), start.getTime(), end.getTime())
                break;
        }
    return  { style: { backgroundColor: 'black' } };
    };

    const handleSelected = (event) => 
    {
        setSelected(event);
        console.log('[handleSelected - event]', event);
    };
    
    return (
        <div style={{ height: '700px' }}>
            <Calendar
                selected={selected}
                onSelectEvent={handleSelected}
                selectable={true}
                localizer={localizer}
                popup
                events={getEventsList({ events, uniqueEvents })}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                onSelectSlot={handleSlotSelection}
            />
        </div>
    );
}

export default CalendarComponent;
