import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';
import { SideBar } from '../../components';

const AllCalendar = () => {
    //Get Google API
    let gapi = window.gapi;
    const DraggableCalendar = withDragAndDrop(Calendar);
    const localizer = momentLocalizer(moment);
    let allViews = Object.keys(Views).map(k => Views[k]);

    const [events, setEvents] = useState([
        {
            id: 0,
            title: 'Hello',
            allDay: true,
            start: new Date(Date.now()).toDateString(),
            end: new Date(Date.now() + 3 * 1000 * 60 * 60).toDateString(),
        },
    ]);

    async function getCalendar() {
        const calendar = await gapi.client.calendar.events.list({
            calendarId:
                'lambdaschool.com_5ql54gdu6bsdug0i05q61cq610@group.calendar.google.com',
            timeMin: new Date().toISOString(),
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
        setEvents([...events, ...calEvents]);

        // const list = await gapi.client.calendar.calendarList.list({
        //     maxResults: 10,
        // });

        // console.log(list);
        // console.log(list.result.items);
    }

    async function insertEvent() {
        const insert = await gapi.client.calendar.events.insert({
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
        });

        await getCalendar();
    }

    function hoursFromNow(n) {
        return new Date(Date.now() + n * 1000 * 60 * 60).toISOString();
    }

    return (
        <>
            <SideBar>
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
                <DraggableCalendar
                    localizer={localizer}
                    events={events}
                    style={{ height: 800 }}
                    draggableAccessor={event => true}
                    resizable
                    selectable
                    onEventResize={event => {
                        console.log(event);
                    }}
                    onSelectSlot={event => {
                        console.log(event);
                        setEvents([
                            ...events,
                            {
                                id: 1,
                                title: 'This Event',
                                start: event.start,
                                end: event.end,
                            },
                        ]);
                    }}
                    min={new Date(2019, 11, 13, 8)}
                    max={new Date(2019, 11, 13, 18)}
                    onSelectEvent={event => {
                        console.log(event);
                    }}
                />
            </SideBar>
        </>
    );
};

export default AllCalendar;
