import React, { useEffect, useMemo } from 'react';
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

    function openScheduleForm(event) {
        actions.setSlotEvent(dispatch, event);
        actions.setNewServiceFormOpen(dispatch, true);
    }

    let teamFilter = useMemo(() => {
        return jobs.jobs.filter(job => {
            if (jobs.teamFilter !== null && job.team !== null) {
                return job.team.docId == jobs.teamFilter;
            }
            return true;
        });
    }, [jobs.jobs, jobs.teamFilter]);

    return (
        <>
            <Filters />
            {jobs.jobs.length == 0 ? (
                <p>Getting Events or there are no events</p>
            ) : null}

            <DraggableCalendar
                selectable
                localizer={localizer}
                events={teamFilter}
                defaultView={Views.WEEK}
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
                style={{ height: 600 }}
            />
            <NewJob />
            <NewJob_02 />
        </>
    );
};

export default AllCalendar;
