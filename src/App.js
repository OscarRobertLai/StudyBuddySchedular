import React, { useState, useEffect } from 'react';
import './App.css';

const DropBox = ({ events, setEvents, isDragOver, setIsDragOver }) => 
{
    // Function to check if an event is unique (NOT IMPLEMENTED YET)
    const isUniqueEvent = (event, events) => {
      return !events.some(e => 
        e.DTSTART === event.DTSTART && 
        e.DTEND === event.DTEND && 
        e.SUMMARY === event.SUMMARY
      );
    };
  
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
        setEvents(parsedEvents); // Update state with parsed events
        console.log('Parsed Events: ', parsedEvents);
      };
      reader.readAsText(file);
    };
  
  const buttonPress = () => {
    const uniqueEvents = []
    
    events.forEach((singleEvent) => {
      if (isUniqueEvent(singleEvent, uniqueEvents))
      {
        uniqueEvents.push(singleEvent);
      }
    })

    // Priting out unique events
    console.log("UNIQUE", uniqueEvents)

    // Printing out unit codes
    const unitCode = events[0].DESCRIPTION.substring(0 , 7)
    console.log(unitCode)
  }
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
      <button onClick={buttonPress}>Press Me</button>
    </div>
  );
}

export default function App ()
  { 
    const [isDragOver, setIsDragOver] = useState(false); // State to track drag over status
    const [events, setEvents] = useState([]);

    return (
      <DropBox events={events} setEvents={setEvents} isDragOver={isDragOver} setIsDragOver={setIsDragOver} />
    )
  }
  
  




