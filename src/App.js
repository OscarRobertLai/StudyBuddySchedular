import React, { useState, useEffect } from 'react';
import './App.css';
import MyCalendarComponent from "./components/Calendar";
import UserTable from "./components/DataTable";


const DropBox = ({ events, setEvents, isDragOver, setIsDragOver, uniqueEvents, setUnqiueEvents }) => 
{
    // Function to parse ICS data
    // \r\n is a carriage return 
    const parseICS = (data) => {
      const events = [];
      const lines = data.split(/\r\n|\n|\r/);
      let currentEvent = null;

      lines.forEach(line => {
        if (line.startsWith('BEGIN:VEVENT')) {
          currentEvent = {};
        } else if (line.startsWith('END:VEVENT')) {
          events.push(currentEvent);
          currentEvent = null;
        } else if (currentEvent) {
          const [key, value] = line.split(':');
          currentEvent[key] = value;
        }
      });
      return events;
    };
  
    // Handler for reading and parsing ICS file content
    const readFileContent = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const parsedEvents = parseICS(content);
        setEvents([...events, ...parsedEvents]);
        console.log('Parsed Events: ', parsedEvents);
      };
      reader.readAsText(file);
    };
  
    // Update the drag over handler
    const dragOverHandler = (event) => {
      event.preventDefault();
      setIsDragOver(true); // Change background color when item is dragged over
    };
  
    // Handler for when the dragged item leaves the drop zone
    const dragLeaveHandler = () => {
      setIsDragOver(false); // Reset background color when item leaves the drop zone
    };
  
  // Handler for dropping files
  const dropHandler = (event) => 
  {
    event.preventDefault();
    setIsDragOver(false); // Reset background color when file is dropped

    // Looping through each file and outputting to the console for now
    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          console.log('File name: ', file.name);
          readFileContent(file);
        }
      }
    } else {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        console.log('File name: ', event.dataTransfer.files[i].name);
        readFileContent(event.dataTransfer.files[i]);
      }
    }
  };

  return (
    <div>
      <div
        id="drop_zone"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        className={`drop-zone ${isDragOver ? 'drop-zone-drag-over' : ''}`}>
        <p>Drag one or more files to this <i>drop zone</i>.</p>
      </div>
      
    </div>
  );
}


const TestButton = ({ e, uniqueEvents, setUnqiueEvents, events }) => {

  const getUniqueEventsByName = (events) => {
    const uniqueEvents = [];
    const seenSummaries = new Set();
  
    events.forEach(event => {
      if (!seenSummaries.has(event.SUMMARY)) {
        seenSummaries.add(event.SUMMARY);
        uniqueEvents.push(event);
      }
    });
  
    return uniqueEvents;
  };

  // Run this code on the button press
  const buttonPress = () => {
    const newUniqueEvents = getUniqueEventsByName(events);
    console.log("UNIQUE: ", newUniqueEvents)  
    setUnqiueEvents([...uniqueEvents, ...newUniqueEvents]);
  };

  return <button onClick={buttonPress}>Press Me</button>;
  
};


// const DetermineTime = ({ events }) => {
//   const [time1, setTime1] = useState('09:00');
//   const [time2, setTime2] = useState('17:00');

//   const handleCalculation = (e) => {
//     e.preventDefault(); // Prevent the default form submit action
//     console.log( time1, time2 )
//   }
  
//   const handleTime1Change = (e) => {
//     setTime1(e.target.value);
//   };

//   const handleTime2Change = (e) => {
//     setTime2(e.target.value);
//   };

//   return (
//     <form onSubmit={handleCalculation}>
//       {/* First Hour Picker */}
//       <div>
//         <label htmlFor="timePicker1">Select Hour 1:</label>
//         <input type="time" id="timePicker1" name="timePicker1" value={time1} onChange={handleTime1Change} />
//       </div>

//       {/* Second Hour Picker */}
//       <div>
//         <label htmlFor="timePicker2">Select Hour 2:</label>
//         <input type="time" id="timePicker2" name="timePicker2" value={time2} onChange={handleTime2Change} />
//       </div>

//       {/* Submit Button */}
//       <div>
//         <button type="submit">Submit</button>
//       </div>
//     </form>
//   );
// }



export default function App (){ 
  const [selected, setSelected] = useState();
  const [isDragOver, setIsDragOver] = useState(false); // State to track drag over status
  const [events, setEvents] = useState([]);
  const [uniqueEvents, setUnqiueEvents] = useState([]);
  // cosnt [epochTimes, setEpochTimes] = useState([])

  const data = React.useMemo(
    () => [
      { name: 'Alice', age: 30, city: 'New York' },
      { name: 'Bob', age: 32, city: 'San Francisco' },
      { name: 'Carly', age: 25, city: 'Miami' },
      // Add more user data here
    ],
    []
  );
    return (
      <div>
        <DropBox 
          events={events}
          setEvents={setEvents}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          uniqueEvents={uniqueEvents}
          setUnqiueEvents={setUnqiueEvents} 
        />
        <TestButton 
          uniqueEvents={uniqueEvents}
          setUnqiueEvents={setUnqiueEvents}
          events={events}
        />
        <MyCalendarComponent 
        selected={selected}
        setSelected={setSelected}
        events={events}
        uniqueEvents={uniqueEvents}
        />
        <UserTable data={data} />
      </div>
    );

  }
