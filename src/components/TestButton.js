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

  export default TestButton;