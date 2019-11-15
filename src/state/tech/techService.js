import Firebase from '../../config/firebase';

const db = Firebase.getFirestore();

export const service = {
    async addTechToTeam(techEmail, teamId) {
        const team = (await db.collection('teams').doc(teamId).get()).data();

        await db.collection('teams').doc(teamId).update({ users: [...team.users, techEmail] });
    },

    async archiveTech(techId) {
        await db.collection('teams').doc(techId).update({ disabled: true });
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
