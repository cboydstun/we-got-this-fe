import moment from 'moment';
// export const Moment = moment().format();

export const times = [
    {
        display: '8:00 A.M.',
        hour: 8,
    },
    {
        display: '9:00 A.M.',
        hour: 9,
    },
    {
        display: '10:00 A.M.',
        hour: 10,
    },
    {
        display: '11:00 A.M.',
        hour: 11,
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
