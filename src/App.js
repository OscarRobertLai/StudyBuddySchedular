import React, { useState, useEffect } from 'react';
import './App.css';
import MyCalendarComponent from "./components/Calendar";
import UserTable from "./components/DataTable";
import DropBox from "./components/DropBox"
import TestButton from './components/TestButton';


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
  const [epochTimes, setEpochTimes] = useState([])

  
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
        <UserTable />
      </div>
    );

  }