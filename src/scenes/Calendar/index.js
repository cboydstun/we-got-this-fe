import React, { useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';
import { actions } from '../../state/jobs/jobsActions';
import { useStateValue } from '../../state';

import NewJob from '../../components/dialogs/NewJob';
import NewJob_02 from '../../components/dialogs/NewJob_02';

import Filters from './components/Filters';

const AllCalendar = () => {
    //Get Google API
    let gapi = window.gapi;
    const DraggableCalendar = withDragAndDrop(Calendar);
    const localizer = momentLocalizer(moment);
    const [{ auth, jobs }, dispatch] = useStateValue();

    let allViews = Object.keys(Views).map(k => Views[k]);

    useEffect(() => {
        if (
            auth.currentUser &&
            auth.currentUser.docRef &&
            auth.calendarLoaded
        ) {
            console.log('Getting Calendar Events');
            //This is because there is a delay between gapi loading and the user being actually authenticated
            setTimeout(() => {
                actions.getAllCalendarEvents(dispatch);
            }, 1000);
        }
    }, [auth.calendarLoaded, auth.currentUser, dispatch]);

    async function getCalendar() {
        let currentMonth = moment([moment().year(), moment().month(), 1]);
        let currentISOMonth = currentMonth.toISOString();
        let twoMonthLookAhead = currentMonth.add(3, 'months').toISOString();
        const calendar = await gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: currentISOMonth,
            timeMax: twoMonthLookAhead,
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
        });

        console.log(calendar);
        console.log(calendar.result.items);

        let calEvents = [];
        calendar.result.items.forEach(calEvent => {
            console.log(calEvent);
            calEvents.push({
                id: calEvent.id,
                title: calEvent.summary,
                start: new Date(calEvent.start.date || calEvent.start.dateTime),
                end: new Date(calEvent.end.date || calEvent.end.dateTime),
                details: {
                    name: 'Customer Name',
                    customerId: '1231234234',
                    serviceID: '123480912384',
                },
            });
        });
        console.log(calEvents);

        // console.log('Calendar List', list);
        // console.log('List Items', list.result.items);
    }

    async function insertEvent() {
        await gapi.client.calendar.events.insert({
            calendarId: 'primary',
            start: {
                dateTime: hoursFromNow(2),
                timeZone: 'America/Chicago',
            },
            end: {
                dateTime: hoursFromNow(3),
                timeZone: 'America/Chicago',
            },
            summary: 'Have Fun!!',
            description: 'Enjoy a nice little break :)',
            extendedProperties: {
                shared: {
                    test: 'test string',
                    number: 123,
                    boolean: true,
                },
            },
        });

        await getCalendar();
    }

    function hoursFromNow(n) {
        return new Date(Date.now() + n * 1000 * 60 * 60).toISOString();
    }

    function openScheduleForm(event) {
        actions.setSlotEvent(dispatch, event);
        actions.setNewServiceFormOpen(dispatch, true);
    }

    return (
        <>
            <button
                onClick={() => {
                    getCalendar();
                }}
            >
                Get Calendar
            </button>
            <button
                onClick={() => {
                    insertEvent();
                }}
            >
                Insert Event
            </button>

            {jobs.jobs.length == 0 ? (
                <p>Getting Events or there are no events</p>
            ) : null}

            <DraggableCalendar
                localizer={localizer}
                events={jobs.jobs}
                style={{ height: 600 }}
                draggableAccessor={event => true}
                resizable
                selectable
                onEventResize={event => {
                    console.log(event);
                }}
                onSelectSlot={event => {
                    openScheduleForm(event);
                }}
                min={new Date(2019, 11, 13, 8)}
                max={new Date(2019, 11, 13, 18)}
                onSelectEvent={event => {
                    console.log(event);
                }}
            />
            <NewJob />
            <NewJob_02 />
        </>
    );
};

export default AllCalendar;
