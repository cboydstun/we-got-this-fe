import Firebase from '../../config/firebase';
// import { installActionNames } from '..';
const db = Firebase.getFirestore();

export const service = {
    async addCustomer(values) {
        let docRef = await db.collection('customers').add({
            ...values,
        });

        let customers = {};
        let doc = await docRef.get();
        let docId = doc.id;
        customers = { docId, ...doc.data() };

        return customers;
    },

    async getCustomers() {
        let customers = [];
        let querySnapshot = await db.collection('customers').get();
        console.log('Query Snapshot: ', querySnapshot);
        querySnapshot.forEach(doc => {
            let docId = doc.id;
            let customerData = doc.data();
            let jobPaths = customerData.jobs.map(job => job.path);
            customerData.jobs = jobPaths;
            console.log(customerData);
            let customer = { docId, ...customerData };
            customers.push(customer);
        });
        console.log('Customers from DB: ', customers);
        return customers;
    },

    getCustomerJobs(jobPaths) {
        console.log('Getting Customer Jobs!: ', jobPaths);
        let jobs = [];
        try {
            let promises = jobPaths.map(async path => {
                path = path.slice(path.indexOf('/'));
                console.log(path);
                return await db
                    .collection('jobs')
                    .doc(path)
                    .get();
            });
            Promise.all(promises).then(docSnaps => {
                docSnaps.forEach(docSnap => {
                    jobs.push(docSnap.data());
                });
            });
            return jobs;
        } catch (err) {
            return err;
        }
    },
};

// export default installActionNames(service);
