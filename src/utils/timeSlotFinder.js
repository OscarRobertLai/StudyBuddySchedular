function findFreeSlots(start, end, events) 
{
    // Sort events by their start time
    events.sort((a, b) => a.start - b.start);

    let freeSlots = [];
    let currentStart = start;

    for (let event of events) 
    {
        // If the current event starts after our current start time
        if (event.start > currentStart) 
        {
            // Add the time slot to the free slots
            freeSlots.push({ start: currentStart, end: event.start });
        }
        // Update currentStart to be the later of the event's end or the current start time
        currentStart = new Date(Math.max(currentStart, event.end));
    }

    // If there's still time after the last event, add that time slot
    if (currentStart < end) 
    {
        freeSlots.push({ start: currentStart, end: end });
    }

    return freeSlots;
}

export default findFreeSlots;