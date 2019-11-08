import Firebase from '../../config/firebase';

//
//Config
//

const db = Firebase.getFirestore();

//
// Constants
//

export const SET_CUSTOMERS = 'wgt/customer/set_customer';

//
// Actions
//

export async function createCustomer(values) {
    // db.collection('customers')
    //     .add({
    //         ...values,
    //     })
    //     .then(docSnap => {
    //         console.log(docSnap.data());
    //     });

    let customerID = values.name + '123';

    let createdDate = new Date().toISOString();

    db.collection('customers')
        .doc(`${customerID}`)
        .set({
            customerID,
            ...values,
        });

    getCustomers();
}

export async function getCustomers(accountID) {
    db.collection('customers')
        .where('account_id', '==', `${accountID}`)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.id, ' => ', doc.data());
            });
        });
}

//
// Reducer
//

export default function reducer(state, action) {
    //define payload
    let payload = action.payload;

    switch (action.type) {
        case SET_CUSTOMERS:
            return {
                ...state,
                customers: payload,
            };
        default:
            return {
                ...state,
            };
    }
}
