import BinarySearchTree from "../utils/searchBST"

const DropBox = ({ events, setEvents, isDragOver, setIsDragOver, binarySearchTree, setBinarySearchTree}) => 
{

  function convertToDate(str) {
      // Extract components from the string
      const year = parseInt(str.substring(0, 4), 10);
      const month = parseInt(str.substring(4, 6), 10) - 1; // Month is 0-indexed in JavaScript
      const day = parseInt(str.substring(6, 8), 10);
      const hours = parseInt(str.substring(9, 11), 10);
      const minutes = parseInt(str.substring(11, 13), 10);
      const seconds = parseInt(str.substring(13, 15), 10);
  
      // Construct the Date object
      return new Date(year, month, day, hours, minutes, seconds);
  }

  const parseICS = (data) => {
    const bst = new BinarySearchTree();
    const events = [];
    const lines = data.split(/\r\n|\n|\r/);
    let currentEvent = null;

    lines.forEach(line => {
      if (line.startsWith('BEGIN:VEVENT')) {

        currentEvent = {};

      } else if (line.startsWith('END:VEVENT')) {
        const dtStartValue = convertToDate(currentEvent["DTSTART;TZID=Australia/Melbourne"]);
        const dtEndValue = convertToDate(currentEvent["DTEND;TZID=Australia/Melbourne"]);

        const convertedEvent = {
          title: currentEvent.DESCRIPTION,
          start: dtStartValue,
          end: dtEndValue
        }

        bst.insert(convertedEvent);
        events.push(convertedEvent);
        currentEvent = null;
      } else if (currentEvent) {
        const [key, value] = line.split(':');
        currentEvent[key] = value;
      }
      
    });
    // console.log("SET", events)
    // console.log("SET2", newEpochTimes)
    setBinarySearchTree(bst)
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

export default DropBox;
