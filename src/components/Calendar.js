// CalendarComponent.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import findFreeSlots from "../utils/timeSlotFinder";


// Localizer for calendar
const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, groupedEvents, selected, setSelected, binarySearchTree, freeSlots, setFreeSlots }) => {

    const eventPropGetter = (event) => {
        // Find the category (file) index for the current event
        const categoryIndex = groupedEvents.findIndex((category) => category.includes(event));

        // Set a default color if the category index is not found
        const backgroundColor = getCategoryColor(categoryIndex);

        const border = '0px';
        return { style: { backgroundColor, border } };
    };

    const getCategoryColor = (categoryIndex) => {
        const rem = categoryIndex % 5 
        switch(rem){
            case 0:
                categoryIndex = 0;
                break;
            case 1:
                categoryIndex = 1;
                break;
            case 2:
                categoryIndex = 2;
                break;
            case 3:
                categoryIndex = 3;
                break;
            case 4:
                categoryIndex = 4;
                break;
        }
        const colors = ['blue', 'red', 'green', 'orange', 'pink']; // Add more colors as needed
        return colors[categoryIndex];
    };


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
                events={events.flatMap(list => list)}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                onSelectSlot={handleSlotSelection}
                eventPropGetter={eventPropGetter}
            />
        </div>
    );
}

export default CalendarComponent;
