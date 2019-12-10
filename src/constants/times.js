import moment from 'moment';
// export const Moment = moment().format();

export const times = [
    {
        display: '8:00 A.M.',
        hour: 8,
    },
    {
        display: '8:30 A.M.',
        hour: 8.5,
    },
    {
        display: '9:00 A.M.',
        hour: 9,
    },
    {
        display: '9:30 A.M.',
        hour: 9.5,
    },
    {
        display: '10:00 A.M.',
        hour: 10,
    },
    {
        display: '10:30 A.M.',
        hour: 10.5,
    },
    {
        display: '11:00 A.M.',
        hour: 11,
    },
    {
        display: '11:30 A.M.',
        hour: 11.5,
    },
    {
        display: '12:00 P.M.',
        hour: 12,
    },
    {
        display: '12:30 A.M.',
        hour: 12.5,
    },
    {
        display: '1:00 P.M.',
        hour: 13,
    },
    {
        display: '1:30 A.M.',
        hour: 13.5,
    },
    {
        display: '2:00 P.M.',
        hour: 14,
    },
    {
        display: '2:30 A.M.',
        hour: 14.5,
    },
    {
        display: '3:00 P.M.',
        hour: 15,
    },
    {
        display: '3:30 A.M.',
        hour: 15.5,
    },
    {
        display: '4:00 P.M.',
        hour: 16,
    },
    {
        display: '4:30 A.M.',
        hour: 16.5,
    },
    {
        display: '5:00 P.M.',
        hour: 17,
    },
    {
        display: '5:30 A.M.',
        hour: 17.5,
    },
    {
        display: '6:00 P.M.',
        hour: 18,
    },
];

export const durations = [
    {
        display: '30 Minutes',
        value: 0.5,
    },
    {
        display: '1 Hour',
        value: 1,
    },
    {
        display: '1 Hour 30 Minutes',
        value: 1.5,
    },
    {
        display: '2 Hours',
        value: 2,
    },
    {
        display: '2 Hours 30 Minutes',
        value: 2.5,
    },
    {
        display: '3 Hours',
        value: 3,
    },
    {
        display: '3 Hours and 30 Minutes',
        value: 3.5,
    },
    {
        display: '4 Hours',
        value: 4,
    },
];

//
//Used to create the calendar time windows in the
//Job Scheduler
export const createTimes = dateTime => {
    return times.map(time => {
        let day = moment(dateTime).format('LL');
        console.log('Parsed Day', day);
        return {
            ...time,
            value: moment(day)
                .add(time.hour, 'hours')
                .format('LLL'),
        };
    });
};
