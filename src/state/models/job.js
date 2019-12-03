import moment from 'moment';

export default {
    formatJob,
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
    };
}
