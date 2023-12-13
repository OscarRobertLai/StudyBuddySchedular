// CalendarComponent.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import findFreeSlots from "../utils/timeSlotFinder";


// Localizer for calendar
const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, selected, setSelected, binarySearchTree, freeSlots, setFreeSlots}) => 
{
    // console.log("EVENTS", events)
     const handleSlotSelection = ({ start, end, action }) => 
     {
        switch (action) 
        {
            case "click":
                console.log("CLICKED", start.getDate(), end.getDate())
                break;
            case "select":
                const eventsInRange = binarySearchTree.findInRange(start, end)
                console.log("EVENTS IN RANGE:", eventsInRange)
                const freeSlots = findFreeSlots(start, end, eventsInRange)
                console.log("FREE SLOTS:", freeSlots)
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
