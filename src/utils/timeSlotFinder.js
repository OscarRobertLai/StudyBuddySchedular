

const timeSlotFinder = (binarySearchTree, selectedStart, selectedEnd) => 
{
    const initialEvent = binarySearchTree.findClosestLargerStart(selectedStart)
    const pot = binarySearchTree.findClosestSmallerStart(selectedStart)
    // console.log("GG", pot)

    if (initialEvent !== null){
        let eventsList = timeSlotFinderAux(binarySearchTree, initialEvent.value.start, selectedEnd, [])
        // console.log("SELECTED START,", selectedStart)
        // console.log("NEXT START,", pot.value)
        if (initialEvent.value.start <= selectedEnd){
            // console.log("1")
            eventsList.unshift(initialEvent)    
        }
        if (pot.value.end > selectedStart){
            // console.log("2")
            eventsList.unshift(pot)
        }

        console.log("EVENTS BETWEEN SELECTED:", eventsList)

        eventsList.forEach((event) => {
            // Do something with each event
        });
    }

}

const timeSlotFinderAux = (binarySearchTree, searchStart, selectedEnd, currentEvents) => 
{

    const nextEvent = binarySearchTree.findClosestLargerStart(searchStart)
    console.log("NEXT", nextEvent)
    if (nextEvent === null)
    {
        return currentEvents
    }
    if (nextEvent.value.start > selectedEnd) 
    {
        console.log("HIT BOTTOM", nextEvent)
        const cats = binarySearchTree.findClosestLargerStart(nextEvent.value.start)
        console.log("Çurr", currentEvents)
        console.log("cats", cats)
        return currentEvents
    } else
    {
        currentEvents.push(nextEvent)
        const eventsList = timeSlotFinderAux(binarySearchTree, nextEvent.value.start, selectedEnd, currentEvents)
        return eventsList
    }

}

// Returns the number of
export default timeSlotFinder;
