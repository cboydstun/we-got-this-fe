import Firebase from '../../config/firebase';

const db = Firebase.getFirestore();

export const service = {
    async addTechToTeam(techEmail, teamId) {
        const team = (await db.collection('teams').doc(teamId).get()).data();

        db.collection('teams').doc(teamId).update({ users: [ ...team.users, techEmail ] });
    },

    inviteTech: ({ firstName, lastName, email, phone, address, notes, city, zip, }) => {
        db.collection('techs').add({
            firstName,
            lastName,
            email,
            phone,
            address,
            notes,
            city,
            zip,
        });
    }
};
