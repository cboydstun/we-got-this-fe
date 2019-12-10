1. Select a slot Event
   Day => Start Day: DateTime
   Week => Start: DateTime, End: DateTime
   Day => Start: DateTime, End: DateTime

2. Need to select the customer or create a new one

3. Need to determine which team to assign the job to

    1. Using the slot selected
    2. We would have all events in the global state
    3. Could check iterate through and check against all of them?
    4. Returns a list of all teams with unavailable darkened
    5. Admin can select from those teams
    6. Or if none... select any team.
    7. selected team => calendarId, teamId

4. Add to Google Calendar

    1. Needed Data:

        - DateTime of total arrival window and cleaning
        - Customer Zipcode
        - Customer Name
        - CustomerId (as Firebase DocId)
        - Team Name that is assigned
        - TeamId (as Firebase DocId)
        - Type of cleaning
        - CalendarId (of the team that is being added)

    2. \*\*Research
        1. Can you add data to google calendar event with meta data?

5. Update Global state of events
    1. What does the global state of events look like?
        1. So far it's just an array of objects that
        2. Probably need to split the calEvents by team so it looks like: jobs: {
           allJobs: [{}, {}, ...]
           teamA: [{}, {}, {}]
           teamB: [{}, {}, {}]
           }
    2. Based off the team that's been assigned, add the calEvent to their respective array and allJobs for funsies.
    3. What does the Event look like:
       {
       id,
       title: String,
       start: new Date(),
       end: new Date(),
       details: {
       zipcode,
       duration,
       teamAssigned,
       teamId,
       customerName,
       customerId,
       type of job
       }
       }
