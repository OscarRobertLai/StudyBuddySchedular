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
  const [uniqueEvents, setUnqiueEvents] = useState([]);
  const [epochTimes, setEpochTimes] = useState([]);
  const [files, setFiles] = useState([]);
  const [uniqueFileName, setUniqueFileName] = useState([]);

  
    return (
      <div>
        <DropBox  
          events={events}
          setEvents={setEvents}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          uniqueEvents={uniqueEvents}
          setUnqiueEvents={setUnqiueEvents} 
          uniqueFileName={uniqueFileName}
          setUniqueFileName={setUniqueFileName}
          files={files}
          setFiles={setFiles}
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
        epochTimes={epochTimes}
        setEpochTimes={setEpochTimes}
        />
        <UserTable />
      </div>
    );

  }

