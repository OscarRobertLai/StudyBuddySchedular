// CalendarComponent.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Localizer for calendar
const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, selected, setSelected, epochTimes, setEpochTimes}) => {

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
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                onSelectSlot={handleSlotSelection}
            />
        </div>
    );
}

export default CalendarComponent;
