import React, { useState } from 'react';
import './App.css';
import MyCalendarComponent from "./components/Calendar";
import UserTable from "./components/DataTable";
import DropBox from "./components/DropBox"


export default function App (){ 
  const [selected, setSelected] = useState();
  const [isDragOver, setIsDragOver] = useState(false); // State to track drag over status
  const [events, setEvents] = useState([]);
  const [binarySearchTree, setBinarySearchTree] = useState();
  const [freeSlots, setFreeSlots] = useState([]);
  
    return (
      <div>
        <DropBox 
          events={events}
          setEvents={setEvents}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          binarySearchTree={binarySearchTree}
          setBinarySearchTree={setBinarySearchTree}
        />
        <MyCalendarComponent 
        selected={selected}
        setSelected={setSelected}
        events={events}
        binarySearchTree={binarySearchTree}
        freeSlots={freeSlots}
        setFreeSlots={setFreeSlots}
        />
        <UserTable />
      </div>
    );

  }

