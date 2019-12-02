import Firebase from '../../config/firebase';

const db = Firebase.getFirestore();

export const service = {
    //
    //GET OR CREATE CURRENT USER
    async getOrCreateCurrentUser(authUser) {
        let { email, displayName, photoURL } = authUser;

        let currentUser;
        let querySnapshot = await db
            .collection('users')
            .where('email', '==', 'scottknight7@gmail.com')
            .limit(1)
            .get();

        if (!querySnapshot.empty) {
            console.log('Got Current User');
            querySnapshot.forEach(doc => {
                // console.log('Doc: ', doc, 'Doc Data ', doc.data());
                let docRef = doc.id;
                currentUser = { docRef, ...doc.data() };
            });
        } else {
            console.log('No User found, creating a new one!');
            //Create a new user
            let docRef = await db.collection('users').add({
                email,
                displayName,
                photoURL,
                disabled: false,
                phone: {
                    primary: '3233233232',
                    secondary: '3233233232',
                },
            });

            docRef.get().then(doc => {
                let docRef = doc.id;
                currentUser = { docRef, ...doc.data() };
            });
        }
        return currentUser;
    },

    //Edit Admin
    async editAdmin(updateAdmin) {
        let docRef = await db
            .collection('accounts')
            .doc(`${updateAdmin.docRef}`)
            .put({
                ...updateAdmin,
            });

        let updatedAdmin = null;
        docRef.get().then(doc => {
            let docRef = doc.id;
            updatedAdmin = { docRef, ...doc.data() };
        });
        return updatedAdmin;
    },

    async createCompany(values) {
        let docRef = await db.collection('accounts').add({
            ...values,
        });
        let company = {};
        let doc = await docRef.get();
        let docId = doc.id;
        company = { docId, ...doc.data() };
        return company;
    },
    //GET COMPANY
    async getCompany(accountId) {
        let currentCompany;
        let querySnapshot = await db
            .collection('accounts')
            .where('company', '==', accountId)
            .get();
        querySnapshot.forEach(function(doc) {
            let docId = doc.id;
            currentCompany = { docId, ...doc.data() };
        });
        return currentCompany;
    },

    //GET USERS
    async getUsers() {
        let users = [];
        let querySnapshot = await db.collection('users').get();
        querySnapshot.forEach(doc => {
            let docId = doc.id;
            let userData = doc.data();
            // let jobPaths = customerData.jobs.map(job => job.path);
            // customerData.jobs = jobPaths;
            let user = { docId, ...userData };
            users.push(user);
        });
        return users;
    },

    // GIVE ADMIN STATUS
    async giveAdminStatus(){
        let docRef = await db.collection('users').doc(`${docId}`).update({
            "roles": "admin"
        });
        // let adminRole = {};
        let doc = await docRef.get();
        let docId = doc.id;
        let adminRole = { docId, ...doc.data() };
        return adminRole;
    },

    async updateUser(values) {
        let docId = values.docId;
        const formatData = values => {
            return {
                displayName: values.displayName,
                phone: {
                    primary: values.phone,
                },
                email: values.email,
                role: [values.role || 'tech'],
            };
        };
        //Don't set the docId to the actual record... like an idiot.
        delete values.docId;
        //Update the user
        await db
            .collection('users')
            .doc(`${docId}`)
            .update(formatData(values));

        let doc = await db
            .collection('users')
            .doc(`${docId}`)
            .get();
        let updatedUser = { docId: doc.id, ...doc.data() };
        return updatedUser;
    },
};
