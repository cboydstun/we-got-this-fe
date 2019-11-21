import Firebase from '../../config/firebase';
import moment from 'moment';

const db = Firebase.getFirestore();

export const service = {
    async scheduleNewJob(values) {
        const formatValues = values => {
            return {
                customer: `/customers/${values.customer}` || '',
                details: {
                    arrivalWindowStart: values.arrivalWindowStart,
                    arrivalWindowEnd: values.arrivalWindowEnd,
                    duration: values.duration,
                    latest_end_time: moment(values.arrivalWindowEnd)
                        .add(values.duration, 'hours')
                        .format('LLL'),
                },
                location: {
                    street: values.street,
                    city: values.city,
                    state: values.region,
                    zipcode: values.zipcode,
                },
                type: values.cleaningType,
            };
        };

        let formattedValues = formatValues(values);
        console.log('Formatted Values: ', formattedValues);

        let docRef = await db.collection('jobs').add({ ...formattedValues });
        let docId = (await docRef.get()).id;

        console.log('NewJob DocRef: ', docId);
        return docId;
    },

    async addJobToCustomer(customerDocId, jobDocId) {
        let customer = (
            await db
                .collection('customers')
                .doc(`${customerDocId}`)
                .get()
        ).data();

        console.log('AddJobToCustomer: ', customer);

        let updatedJobs = await db
            .collection('customers')
            .doc(`${customerDocId}`)
            .update({ jobs: [...customer.jobs, `/jobs/${jobDocId}`] });

        console.log('UpdatedJobs: ', updatedJobs);
    },
};
