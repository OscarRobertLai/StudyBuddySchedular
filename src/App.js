import React, { useState, useEffect } from 'react';
import './App.css';
import MyCalendarComponent from "./components/Calendar";
import UserTable from "./components/DataTable";
import DropBox from "./components/DropBox"
import TestButton from './components/TestButton';


export default function App (){ 
  const [selected, setSelected] = useState();
  const [isDragOver, setIsDragOver] = useState(false); // State to track drag over status
  const [events, setEvents] = useState([]);
  const [epochTimes, setEpochTimes] = useState([])

  
    return (
      <div>
        <DropBox 
          events={events}
          setEvents={setEvents}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
        />
        {/* <TestButton 
          events={events}
        /> */}
        <MyCalendarComponent 
        selected={selected}
        setSelected={setSelected}
        events={events}
        epochTimes={epochTimes}
        setEpochTimes={setEpochTimes}
        />
        <UserTable />
      </div>
    );

  }

