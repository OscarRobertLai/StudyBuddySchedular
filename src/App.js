import React, { useState } from 'react';
import './App.css';
import MyCalendarComponent from "./components/Calendar";
import UserTable from "./components/DataTable";
import DropBox from "./components/DropBox"


export default function App ()
{ 
  const [selected, setSelected] = useState();
  const [isDragOver, setIsDragOver] = useState(false); // State to track drag over status
  const [events, setEvents] = useState([]);
  const [binarySearchTree, setBinarySearchTree] = useState();
  const [freeSlots, setFreeSlots] = useState([]);
  const [epochTimes, setEpochTimes] = useState([]);
  const [files, setFiles] = useState([]);


  
    return (
      <div>
        <DropBox  
          events={events}
          setEvents={setEvents}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          binarySearchTree={binarySearchTree}
          setBinarySearchTree={setBinarySearchTree}
          uniqueFileName={uniqueFileName}
          setUniqueFileName={setUniqueFileName}
          files={files}
          setFiles={setFiles}
        />
        <MyCalendarComponent 
        selected={selected}
        setSelected={setSelected}
        events={events}
        binarySearchTree={binarySearchTree}
        freeSlots={freeSlots}
        setFreeSlots={setFreeSlots}
        events={events.flatMap(list => list)}
        groupedEvents={events}
        epochTimes={epochTimes}
        setEpochTimes={setEpochTimes}
        />
        <UserTable />
      </div>
    );

  
  }

