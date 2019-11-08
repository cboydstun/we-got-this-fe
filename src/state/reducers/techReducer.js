import Firebase from '../../firebase';

const db = Firebase.getFirestore();


export const inviteTech = (/* dispatch, */ tech) => {

    let {name, email, phone, address} = tech;

    db.collection('techs').add({
        name,
        email,
        phone,
        address
    });

    // dispatch({
    //     type: INVITE_TECH,
    //     payload: user,
    // });

}

// export default function reducer(state, action) {
//     let payload = action.payload

//     switch (action.type) {
//         case INVITE_TECH: 
//         return {
//             ...state,
//             ...payload
//         }
//     }
// }