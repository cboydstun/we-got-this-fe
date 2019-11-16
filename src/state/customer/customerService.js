import Firebase from '../../config/firebase';
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

    async getCustomers(accountId) {
        let customers = [];
        let querySnapshot = await db.collection('customers').get();
        console.log('Query Snapshot: ', querySnapshot);
        querySnapshot.forEach(doc => {
            let docId = doc.id;
            customers.push({ docId, ...doc.data() });
        });
        console.log('Customers from DB: ', customers);
        return customers;
    },

    async getCustomerJobs(jobPaths) {
        let jobs = [];
        let promises = jobPaths.map(path => {
            return db
                .collection('jobs')
                .doc(path)
                .get();
        });

        Promise.all(promises).then(res => {
            console.log(res);
        });
    },
};
