const slots = TimeSlotsFinder.getAvailableTimeSlotsInCalendar({
    calendarData: "SOME ICAL DATA",
    calendarFormat: TimeSlotsFinder.TimeSlotsFinderCalendarFormat.iCal,
    configuration: {
        timeSlotDuration: 15,
        minAvailableTimeBeforeSlot: 5,
        minTimeBeforeFirstSlot: 48 * 60, // 48 hours in minutes
        availablePeriods: [{
            isoWeekDay: 5,
            shifts: [{ startTime: "10:00", endTime: "20:00" }] 
        }, {
            isoWeekDay: 6,
            shifts: [
                { startTime: "10:00", endTime: "20:00" },
                { startTime: "10:00", endTime: "13:00" },
            ]
        }],
        timeZone: "Europe/Paris",   
    },
    from: new Date("2020-09-21T00:00:00.000+02:00"),
    to: new Date("2020-11-12T23:59:59.999+02:00"),
})

console.log("SLOTS")