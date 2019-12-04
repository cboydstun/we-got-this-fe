import moment from 'moment';

export default {
    formatJob,
    formatGoogleCalendarEvent,
    formatBigCalendarEvent,
};

function formatJob(values) {
    let { customer, slotEvent, details } = values;
    let { address } = customer.locations[0];
    return {
        customer: customer.docId || 'Unknown',
        details: {
            arrivalWindowStart:
                moment(details.arrivalWindowStart).format('LLL') || null,
            arrivalWindowEnd:
                moment(details.arrivalWindowEnd).format('LLL') || null,
            duration: details.duration || 1,
            latest_end_time: moment(details.arrivalWindowEnd)
                .add(details.duration, 'hours')
                .format('LLL'),
        },
        location: {
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            zipcode: address.zipcode || '',
        },
        type: details.cleaningType || '',
        team: values.team,
    };
}

function formatGoogleCalendarEvent(values) {
    let { customer, slotEvent, details } = values;
    let { address } = customer.locations[0];

    return {
        calendarId: values.calendarId || 'primary',
        start: {
            dateTime: moment(details.arrivalWindowStart).toISOString(),
            timeZone: 'America/Chicago',
        },
        end: {
            dateTime: moment(details.arrivalWindowEnd)
                .add(details.duration, 'hours')
                .toISOString(),
            timeZone: 'America/Chicago',
        },
        summary: customer.name,
        description: `Customer Name: ${customer.name}`,
        extendedProperties: {
            shared: {
                customerId: customer.docId,
                customerName: customer.name,
                team: details.team || 'Clean Team 10',
                teamId: details.teamId || 'TeamId',
                zipcode: address.zipcode,
                type: details.cleaningType,
            },
        },
    };
}

//TODO: Will need to adjust the end date to ensure that it's to the latest end time
function formatBigCalendarEvent(calEvent) {
    let { newJobDocId, customer, slotEvent, details } = calEvent;
    return {
        id: newJobDocId || customer.docId,
        title: customer.name || 'Unknown Name',
        start: new Date(
            details.arrivalWindowStart ||
                calEvent.start.dateTime ||
                calEvent.start.date
        ),
        end: new Date(
            moment(details.arrivalWindowEnd).add(details.duration, 'hours') ||
                calEvent.end.date ||
                calEvent.end.dateTime
        ),
        details: {
            name: customer.name || 'Unknown Name',
            customerId: customer.docId || 'Unknown Doc Id',
            jobID: newJobDocId || 'Unkownn job',
        },
    };
}
