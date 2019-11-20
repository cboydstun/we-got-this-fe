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

export const createTimes = (dateTime = moment()) => {
    return times.map(time => {
        return {
            ...time,
            time: moment(dateTime)
                .add(time.hour, 'hours')
                .format('LLL'),
        };
    });
};
